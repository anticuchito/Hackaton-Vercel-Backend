import { User } from '@prisma/client';

export interface IUserService {
  addFavoriteTrip(userId: string, tripId: string): Promise<void>;
  getFavorites(userId: string): Promise<string[]>;
  addTripCreated(userId: string, tripId: string): Promise<void>;
  getTripsCreated(userId: string): Promise<string[]>;
  removeFavoriteTrip(userId: string, tripId: string): Promise<void>;
}
