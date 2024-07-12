import { Trip } from '@prisma/client';

export interface ITripService {
  createTrip(data: {
    origin: string;
    destination: string;
    startDate: Date;
    duration: number;
    budget: number;
  }): Promise<Trip>;
}
