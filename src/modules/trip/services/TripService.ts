import { injectable, inject } from 'tsyringe';
import { ITripService } from '../interfaces/ITripService';
import { ITripRepository } from '../interfaces/ITripRepository';
import { IUserService } from '../../user/interfaces/IUserService';
import { IOpenAIService } from '../../openai/interfaces/IOpenAIService';
import { Trip, PrismaClient } from '@prisma/client';
import { getUnsplashImages } from '../../../shared/utils/getUnsplashImage';

@injectable()
export class TripService implements ITripService {
  constructor(
    @inject('TripRepository') private tripRepository: ITripRepository,
    @inject('OpenAIService') private openAIService: IOpenAIService,
    @inject('PrismaClient') private prisma: PrismaClient,
    @inject('UserService') private userService: IUserService
  ) {}

  async createTrip(data: {
    origin: string;
    destination: string;
    startDate: Date;
    duration: number;
    budget: number;
    userId?: string;
  }): Promise<any> {
    const prompt = `Create a detailed travel plan of ${data.destination} starting on ${data.startDate.toISOString()} for ${data.duration} days with a total budget of ${data.budget} USD. 
    Split the budget into categories: flights, accommodations, activities, points of interest, and restaurants. 
    Each day should have 4 to 5 activities and points of interest scheduled at different times.
    Use Unsplash for real image URLs for accommodations, activities, points of interest, and restaurants.
    Provide 4 recommended restaurants for the trip.
    The response should be in JSON format with the following structure:
    {
      "flights": {
        "departure": {
          "airline": "Airline name",
          "flightNumber": "Flight number",
          "departureTime": "YYYY-MM-DDTHH:MM:SS",
          "arrivalTime": "YYYY-MM-DDTHH:MM:SS",
          "price": 100
        },
        "return": {
          "airline": "Airline name",
          "flightNumber": "Flight number",
          "departureTime": "YYYY-MM-DDTHH:MM:SS",
          "arrivalTime": "YYYY-MM-DDTHH:MM:SS",
          "price": 140
        }
      },
      "accommodations": [
        {
          "name": "Accommodation name",
          "address": "Accommodation address",
          "price": 100,
          "rating": 4.5,
          "amenities": ["WiFi", "Parking"],
          "description": "Description of the accommodation",
          "images": ["https://source.unsplash.com/random/?hotel"],
          "coordinates": "latitude, longitude"
        }
      ],
      "itinerary": [
        {
          "day": 1,
          "date": "YYYY-MM-DD",
          "schedule": [
            {
              "time": "10:00 AM",
              "type": "activity",
              "details": {
                "name": "Activity name",
                "description": "Description of the activity",
                "duration": 120,
                "cost": 50,
                "coordinates": "latitude, longitude",
                "images": ["https://source.unsplash.com/random/?activity"]
              }
            },
            {
              "time": "12:00 PM",
              "type": "point_of_interest",
              "details": {
                "name": "Point of Interest name",
                "description": "Description of the point of interest",
                "type": "museum",
                "address": "Address of the point of interest",
                "coordinates": "latitude, longitude",
                "imageUrl": "https://source.unsplash.com/random/?museum",
                "openingHours": "Opening hours",
                "ticketPrice": 20
              }
            }
          ]
        }
      ],
      "restaurants": [
        {
          "name": "Restaurant name",
          "address": "Restaurant address",
          "cuisine": "Cuisine type",
          "priceRange": "20-30",
          "rating": 4.5,
          "description": "Description of the restaurant",
          "images": ["https://source.unsplash.com/random/?restaurant"],
          "coordinates": "latitude, longitude"
        }
      ]
    }`;

    const aiResponse = await this.openAIService.generateText(prompt);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (error) {
      throw new Error('Failed to parse AI response as JSON');
    }

    const { flights, accommodations, itinerary, restaurants } = parsedResponse;

    // Reutilizar o crear nuevas entidades
    const mappedAccommodations = await Promise.all(
      (accommodations ?? []).map(async (accommodation: any) => {
        const existingAccommodation = await this.prisma.accommodation.findUnique({
          where: { name: accommodation.name },
        });
        if (existingAccommodation) return existingAccommodation;

        return await this.prisma.accommodation.create({
          data: {
            ...accommodation,
            images: await getUnsplashImages(accommodation.name),
            city: data.destination,
          },
        });
      })
    );

    const mappedRestaurants = await Promise.all(
      (restaurants ?? []).slice(0, 5).map(async (restaurant: any) => {
        const existingRestaurant = await this.prisma.restaurant.findUnique({
          where: { name: restaurant.name },
        });
        if (existingRestaurant) return existingRestaurant;

        return await this.prisma.restaurant.create({
          data: {
            ...restaurant,
            images: await getUnsplashImages(restaurant.name),
            city: data.destination,
          },
        });
      })
    );

    // Calculate endDate
    const endDate = new Date(data.startDate);
    endDate.setDate(endDate.getDate() + data.duration);

    // Create trip with parsed data
    const tripData = {
      origin: data.origin,
      destination: data.destination,
      startDate: data.startDate,
      endDate: endDate,
      duration: data.duration,
      budget: data.budget,
      status: 'planned',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Check if a similar trip already exists
    const existingTrip = await this.prisma.trip.findFirst({
      where: {
        origin: data.origin,
        destination: data.destination,
        startDate: data.startDate,
        duration: data.duration,
        budget: data.budget,
      },
    });

    if (existingTrip) {
      if (data.userId) {
        await this.userService.addTripCreated(data.userId, existingTrip.id);
      }
      return this.getTripDetails(existingTrip.id);
    }

    // Create trip in the database
    const trip = await this.tripRepository.create(tripData as Trip);

    if (data.userId) {
      await this.userService.addTripCreated(data.userId, trip.id);
    }
    
    // Save flights to database and link them to the trip
    const departureFlight = await this.prisma.flight.create({
      data: {
        ...flights.departure,
        departureTime: new Date(flights.departure.departureTime),
        arrivalTime: new Date(flights.departure.arrivalTime),
      },
    });

    const returnFlight = await this.prisma.flight.create({
      data: {
        ...flights.return,
        departureTime: new Date(flights.return.departureTime),
        arrivalTime: new Date(flights.return.arrivalTime),
      },
    });

    await this.prisma.tripFlight.create({
      data: {
        tripId: trip.id,
        flightId: departureFlight.id,
      },
    });

    await this.prisma.tripFlight.create({
      data: {
        tripId: trip.id,
        flightId: returnFlight.id,
      },
    });

    // Save accommodations to database and link them to the trip
    for (const accommodation of mappedAccommodations) {
      await this.prisma.tripAccommodation.create({
        data: {
          tripId: trip.id,
          accommodationId: accommodation.id,
        },
      });
    }

    // Save itinerary to database and link them to the trip
    for (const dayPlan of itinerary) {
      const itineraryDate = new Date(dayPlan.date);
      const createdItinerary = await this.prisma.itinerary.create({
        data: {
          day: dayPlan.day,
          date: itineraryDate,
          tripId: trip.id,
          city: data.destination,
        },
      });

      for (const schedule of dayPlan.schedule) {
        const { time, type, details } = schedule;
        const [hours, minutes] = time.split(/[:\s]/).map((t: string, i: number) => i === 0 ? parseInt(t) : t === 'PM' ? 12 : 0);

        const startTime = new Date(itineraryDate);
        startTime.setHours(hours + minutes, 0, 0, 0);
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + (details.duration || 0));

        if (type === 'activity') {
          const existingActivity = await this.prisma.activity.findUnique({
            where: { name: details.name },
          });

          const activity = existingActivity ? existingActivity : await this.prisma.activity.create({
            data: {
              ...details,
              images: await getUnsplashImages(details.name),
              city: data.destination,
            },
          });

          await this.prisma.itineraryActivity.create({
            data: {
              itineraryId: createdItinerary.id,
              activityId: activity.id,
              startTime: startTime,
              endTime: endTime,
              location: details.coordinates,
            },
          });
        } else if (type === 'point_of_interest') {
          const existingPOI = await this.prisma.pointOfInterest.findUnique({
            where: { name: details.name },
          });

          const poi = existingPOI ? existingPOI : await this.prisma.pointOfInterest.create({
            data: {
              ...details,
              images: await getUnsplashImages(details.name),
              city: data.destination,
            },
          });

          await this.prisma.itineraryPointOfInterest.create({
            data: {
              itineraryId: createdItinerary.id,
              pointOfInterestId: poi.id,
              startTime: startTime,
              endTime: endTime,
              transportation: 'Walk',
            },
          });
        }
      }
    }

    // Save restaurants to database and link them to the trip
    for (const restaurant of mappedRestaurants) {
      await this.prisma.tripRestaurant.create({
        data: {
          tripId: trip.id,
          restaurantId: restaurant.id,
        },
      });
    }

    return this.getTripDetails(trip.id);
  }

  async getTripById(id: string): Promise<any> {
    return this.getTripDetails(id);
  }

  async getTripsByCity(city: string): Promise<Trip[]> {
    return this.tripRepository.findByCity(city);
  }
  async updateTrip(id: string, data: {
    origin: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    budget: number;
    status: string;
    notes?: string;
  }): Promise<any> {
    return this.tripRepository.update(id, data as Trip);
  }

  async deleteTrip(id: string): Promise<void> {
    await this.tripRepository.delete(id);
  }
  
  private async getTripDetails(tripId: string): Promise<any> {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        flights: {
          include: {
            flight: true,
          },
        },
        accommodations: {
          include: {
            accommodation: true,
          },
        },
        itineraryDetails: {
          include: {
            activities: {
              include: {
                activity: true,
              },
            },
            pointsOfInterest: {
              include: {
                pointOfInterest: true,
              },
            },
            accommodations: {
              include: {
                accommodation: true,
              },
            },
          },
        },
        restaurants: {
          include: {
            restaurant: true,
          },
        },
      },
    });

    if (!trip) throw new Error('Trip not found');

    return trip;
  }
}
