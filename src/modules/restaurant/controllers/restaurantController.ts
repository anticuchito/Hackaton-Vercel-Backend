import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IRestaurantService } from '../interfaces/IRestaurantService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class RestaurantController {
  constructor(
    @inject('RestaurantService')
    private restaurantService: IRestaurantService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, address, cuisine, priceRange, city, images } = req.body;
      if (!name || !address || !cuisine || !priceRange || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, address, cuisine, priceRange, city, and images are required and images must be an array');
      }

      const restaurant = await this.restaurantService.create(req.body);
      res.status(201).json(restaurant);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const restaurants = await this.restaurantService.findAll();
      res.json(restaurants);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const restaurant = await this.restaurantService.findById(id);
      if (restaurant) {
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const restaurants = await this.restaurantService.findByCity(city);
      res.json(restaurants);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, address, cuisine, priceRange, city, images } = req.body;
      if (!name || !address || !cuisine || !priceRange || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, address, cuisine, priceRange, city, and images are required and images must be an array');
      }

      const restaurant = await this.restaurantService.update(id, req.body);
      res.json(restaurant);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.restaurantService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
