import { injectable, inject } from 'tsyringe';
import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async addFavoriteTrip(userId: string, tripId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.favoriteTrips.includes(tripId)) {
      user.favoriteTrips.push(tripId);
      await this.userRepository.update(userId, { favoriteTrips: user.favoriteTrips });
    }
  }

  async getFavorites(userId: string): Promise<string[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return user.favoriteTrips;
  }

  async addTripCreated(userId: string, tripId: string): Promise<void> {
    console.log(`Adding trip ${tripId} to user ${userId}`);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      console.error('User not found');
      throw new Error('User not found');
    }

    if (!user.tripsCreated.includes(tripId)) {
      user.tripsCreated.push(tripId);
      await this.userRepository.update(userId, { tripsCreated: user.tripsCreated });
      console.log(`Trip ${tripId} added to user ${userId}`);
    } else {
      console.log(`Trip ${tripId} already exists in user ${userId} history`);
    }
  }
  async getTripsCreated(userId: string): Promise<any[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    return user.tripsCreated;
  }

  async removeFavoriteTrip(userId: string, tripId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    user.favoriteTrips = user.favoriteTrips.filter(id => id !== tripId);
    await this.userRepository.update(userId, { favoriteTrips: user.favoriteTrips });
  }
}
