import { Trip } from '@prisma/client';

export interface ITripService {
  createTrip(data: {
    origin: string;
    destination: string;
    startDate: Date;
    duration: number;
    budget: number;
  }): Promise<any>;
  getTripById(id: string): Promise<any>;
  getTripsByCity(city: string): Promise<Trip[]>;
  updateTrip(id: string, data: {
    origin: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    budget: number;
    status: string;
    notes?: string;
  }): Promise<any>;
  deleteTrip(id: string): Promise<void>;
}
