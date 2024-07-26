import { Trip } from '@prisma/client';

export interface ITripService {
  createTrip(data: {
    origin: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    minBudget: number;
    maxBudget: number;
    adults: number;
    minors: number;
    userId?: string;
  }): Promise<any>;
  getTripById(id: string): Promise<any>;
  getTripsByCity(city: string): Promise<Trip[]>;
  updateTrip(id: string, data: {
    origin: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    minBudget: number;
    maxBudget: number;
    adults: number;
    minors: number;
    status: string;
    notes?: string;
  }): Promise<any>;
  deleteTrip(id: string): Promise<void>;
  getAllTrips(filters: { limit?: number, uniqueDestinations?: boolean }): Promise<Trip[]>;
}
