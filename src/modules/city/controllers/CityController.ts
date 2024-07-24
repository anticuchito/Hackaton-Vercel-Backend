import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { ICityService } from '../interfaces/ICityService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class CityController {
  constructor(
    @inject('CityService') private cityService: ICityService
  ) {}

  async createCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, country } = req.body;
      if (!name || !country) {
        throw new ValidationError('Name and country are required');
      }

      const city = await this.cityService.createCity({ name, country });
      res.status(201).json(city);
    } catch (error) {
      next(error);
    }
  }

  async getCityById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const city = await this.cityService.getCityById(id);
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ message: 'City not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async getCityByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.params;
      const city = await this.cityService.getCityByName(name);
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ message: 'City not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllCities(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cities = await this.cityService.getAllCities();
      res.json(cities);
    } catch (error) {
      next(error);
    }
  }
}
