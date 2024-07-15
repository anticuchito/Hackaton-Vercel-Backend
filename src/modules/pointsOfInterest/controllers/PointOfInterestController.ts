import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IPointOfInterestService } from '../interfaces/IPointOfInterestService';

@injectable()
export class PointOfInterestController {
  constructor(
    @inject('PointOfInterestService')
    private pointOfInterestService: IPointOfInterestService
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const pointOfInterest = await this.pointOfInterestService.create(req.body);
    return res.status(201).json(pointOfInterest);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const pointsOfInterest = await this.pointOfInterestService.findAll();
    return res.json(pointsOfInterest);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const pointOfInterest = await this.pointOfInterestService.findById(id);
    if (pointOfInterest) {
      return res.json(pointOfInterest);
    }
    return res.status(404).json({ message: 'Point of Interest not found' });
  }

  async findByCity(req: Request, res: Response): Promise<Response> {
    const { city } = req.params;
    const pointOfInterest = await this.pointOfInterestService.findByCity(city);
    return res.json(pointOfInterest);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const pointOfInterest = await this.pointOfInterestService.update(id, req.body);
    return res.json(pointOfInterest);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.pointOfInterestService.delete(id);
    return res.status(204).send();
  }
}
