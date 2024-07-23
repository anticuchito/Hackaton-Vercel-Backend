import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IUserService } from '../interfaces/IUserService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class UserController {
  constructor(
    @inject('UserService') private userService: IUserService
  ) {}

  async addFavoriteTrip(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, tripId } = req.body;
      if (!userId || !tripId) {
        throw new ValidationError('UserId and TripId are required');
      }

      await this.userService.addFavoriteTrip(userId, tripId);
      res.status(200).json({ message: 'Trip added to favorites' });
    } catch (error) {
      next(error);
    }
  }

  async getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new ValidationError('UserId is required');
      }

      const favorites = await this.userService.getFavorites(userId);
      res.status(200).json(favorites);
    } catch (error) {
      next(error);
    }
  }

  async getTripsCreated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new ValidationError('UserId is required');
      }

      const tripsCreated = await this.userService.getTripsCreated(userId);
      res.status(200).json(tripsCreated);
    } catch (error) {
      next(error);
    }
  }
  async removeFavoriteTrip(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, tripId } = req.body;
      if (!userId || !tripId) {
        throw new ValidationError('UserId and TripId are required');
      }

      await this.userService.removeFavoriteTrip(userId, tripId);
      res.status(200).json({ message: 'Trip removed from favorites' });
    } catch (error) {
      next(error);
    }
  }
}
