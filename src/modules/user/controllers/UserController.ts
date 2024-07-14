import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IUserService } from '../interfaces/IUserService';

@injectable()
export class UserController {
  constructor(
    @inject('UserService') private userService: IUserService
  ) {}

  async addFavoriteTrip(req: Request, res: Response): Promise<Response> {
    const { userId, tripId } = req.body;
    await this.userService.addFavoriteTrip(userId, tripId);
    return res.status(200).json({ message: 'Trip added to favorites' });
  }

  async getFavorites(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const favorites = await this.userService.getFavorites(userId);
    return res.status(200).json(favorites);
  }

  async getTripsCreated(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const tripsCreated = await this.userService.getTripsCreated(userId);
    return res.status(200).json(tripsCreated);
  }

  async removeFavoriteTrip(req: Request, res: Response): Promise<Response> {
    const { userId, tripId } = req.body;
    await this.userService.removeFavoriteTrip(userId, tripId);
    return res.status(200).json({ message: 'Trip removed from favorites' });
  }
}
