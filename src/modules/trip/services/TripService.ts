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
    const prompt = `Create a travel plan from ${data.origin} to ${data.destination} starting on ${data.startDate.toISOString()} for ${data.duration} days with a budget of ${data.budget} USD. The response should be in JSON format with the following structure:
    {
      "accommodations": [
        {
          "name": "Accommodation name",
          "address": "Accommodation address",
          "price": 100,
          "rating": 4.5,
          "amenities": ["WiFi", "Parking"],
          "description": "Description of the accommodation",
          "images": ["image1_url", "image2_url"]
        }
      ],
      "activities": [
        {
          "name": "Activity name",
          "description": "Description of the activity",
          "duration": 120,
          "cost": 50
        }
      ],
      "pointsOfInterest": [
        {
          "name": "Point of Interest name",
          "description": "Description of the point of interest",
          "type": "museum",
          "address": "Address of the point of interest",
          "coordinates": "GPS coordinates",
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
    const accommodations = parsedResponse.accommodations?.map((accommodation: any) => {
      return {
        name: accommodation.name,
        address: accommodation.address,
        price: accommodation.price,
        rating: accommodation.rating,
        amenities: accommodation.amenities,
        description: accommodation.description,
        images: accommodation.images,
      };
    }) || [];

    const activities = parsedResponse.activities?.map((activity: any) => {
      return {
        name: activity.name,
        description: activity.description,
        duration: activity.duration,
        cost: activity.cost,
      };
    }) || [];

    const pointsOfInterest = parsedResponse.pointsOfInterest?.map((poi: any) => {
      return {
        name: poi.name,
        description: poi.description,
        type: poi.type,
        address: poi.address,
        coordinates: poi.coordinates,
        imageUrl: poi.imageUrl,
        openingHours: poi.openingHours,
        ticketPrice: poi.ticketPrice,
      };
    }) || [];

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

    // Save accommodations to database and link them to the trip
    await Promise.all(accommodations.map(async (accommodation:any) => {
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
    await Promise.all(activities.map(async (activity:any) => {
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
    await Promise.all(pointsOfInterest.map(async (poi:any) => {
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

    return trip;
  }
}
