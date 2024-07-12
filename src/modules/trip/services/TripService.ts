import { injectable, inject } from 'tsyringe';
import { ITripService } from '../interfaces/ITripService';
import { ITripRepository } from '../interfaces/ITripRepository';
import { IOpenAIService } from '../../openai/interfaces/IOpenAIService';
import { Trip, PrismaClient } from '@prisma/client';

@injectable()
export class TripService implements ITripService {
  constructor(
    @inject('TripRepository') private tripRepository: ITripRepository,
    @inject('OpenAIService') private openAIService: IOpenAIService,
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async createTrip(data: {
    origin: string;
    destination: string;
    startDate: Date;
    duration: number;
    budget: number;
  }): Promise<Trip> {
    const prompt = `Create a detailed travel plan from ${data.origin} to ${data.destination} starting on ${data.startDate.toISOString()} for ${data.duration} days with a total budget of ${data.budget} USD. 
    Split the budget into categories: flights, accommodations, activities, and points of interest. 
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
          "price": 100
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
          "images": ["image1_url", "image2_url"],
          "coordinates": "latitude, longitude"
        }
      ],
      "activities": [
        {
          "name": "Activity name",
          "description": "Description of the activity",
          "duration": 120,
          "cost": 50,
          "coordinates": "latitude, longitude",
          "images": ["image1_url", "image2_url"]
        }
      ],
      "pointsOfInterest": [
        {
          "name": "Point of Interest name",
          "description": "Description of the point of interest",
          "type": "museum",
          "address": "Address of the point of interest",
          "coordinates": "latitude, longitude",
          "imageUrl": "URL of the image",
          "openingHours": "Opening hours",
          "ticketPrice": 20
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

    // Verificar y ajustar los datos de la respuesta
    const flights = parsedResponse.flights;
    const accommodations = parsedResponse.accommodations?.map((accommodation: any) => ({
      name: accommodation.name,
      address: accommodation.address,
      price: accommodation.price,
      rating: accommodation.rating,
      amenities: accommodation.amenities,
      description: accommodation.description,
      images: accommodation.images,
      coordinates: accommodation.coordinates,
    })) || [];

    const activities = parsedResponse.activities?.map((activity: any) => ({
      name: activity.name,
      description: activity.description,
      duration: activity.duration,
      cost: activity.cost,
      images: activity.images,
      coordinates: activity.coordinates,
    })) || [];

    const pointsOfInterest = parsedResponse.pointsOfInterest?.map((poi: any) => ({
      name: poi.name,
      description: poi.description,
      type: poi.type,
      address: poi.address,
      coordinates: poi.coordinates,
      imageUrl: poi.imageUrl,
      openingHours: poi.openingHours,
      ticketPrice: poi.ticketPrice,
    })) || [];

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

    // Create trip in the database
    const trip = await this.tripRepository.create(tripData as Trip);

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
    await Promise.all(accommodations.map(async (accommodation: any) => {
      const createdAccommodation = await this.prisma.accommodation.create({
        data: accommodation,
      });
      await this.prisma.tripAccommodation.create({
        data: {
          tripId: trip.id,
          accommodationId: createdAccommodation.id,
        },
      });
    }));

    // Save activities to database and link them to the trip
    await Promise.all(activities.map(async (activity: any) => {
      const createdActivity = await this.prisma.activity.create({
        data: activity,
      });
      await this.prisma.tripActivity.create({
        data: {
          tripId: trip.id,
          activityId: createdActivity.id,
        },
      });
    }));

    // Save points of interest to database and link them to the trip
    await Promise.all(pointsOfInterest.map(async (poi: any) => {
      const createdPOI = await this.prisma.pointOfInterest.create({
        data: poi,
      });
      await this.prisma.tripPointOfInterest.create({
        data: {
          tripId: trip.id,
          pointOfInterestId: createdPOI.id,
        },
      });
    }));

    // Crear itinerarios para cada día del viaje
    for (let day = 0; day < data.duration; day++) {
      const itineraryDate = new Date(data.startDate);
      itineraryDate.setDate(itineraryDate.getDate() + day);

      const itinerary = await this.prisma.itinerary.create({
        data: {
          day: day + 1,
          date: itineraryDate,
          tripId: trip.id,
        },
      });

      // Asignar actividades a los itinerarios
      for (const activity of activities) {
        const createdActivity = await this.prisma.activity.findFirst({
          where: { name: activity.name },
        });
        if (createdActivity) {
          await this.prisma.itineraryActivity.create({
            data: {
              itineraryId: itinerary.id,
              activityId: createdActivity.id,
              startTime: new Date(itineraryDate),
              endTime: new Date(itineraryDate),
              location: activity.coordinates,
            },
          });
        }
      }

      // Asignar puntos de interés a los itinerarios
      for (const poi of pointsOfInterest) {
        const createdPOI = await this.prisma.pointOfInterest.findFirst({
          where: { name: poi.name },
        });
        if (createdPOI) {
          await this.prisma.itineraryPointOfInterest.create({
            data: {
              itineraryId: itinerary.id,
              pointOfInterestId: createdPOI.id,
              startTime: new Date(itineraryDate),
              endTime: new Date(itineraryDate),
              transportation: 'Walk',
            },
          });
        }
      }

      // Asignar alojamientos a los itinerarios
      for (const accommodation of accommodations) {
        const createdAccommodation = await this.prisma.accommodation.findFirst({
          where: { name: accommodation.name },
        });
        if (createdAccommodation) {
          await this.prisma.itineraryAccommodation.create({
            data: {
              itineraryId: itinerary.id,
              accommodationId: createdAccommodation.id,
              checkInTime: new Date(itineraryDate),
              checkOutTime: new Date(itineraryDate),
            },
          });
        }
      }
    }

    return trip;
  }
}
