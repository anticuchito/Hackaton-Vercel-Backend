import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAccommodationService } from '../interfaces/IAccommodationService';

@injectable()
export class AccommodationController {
  constructor(
    @inject('AccommodationService')
    private accommodationService: IAccommodationService
  ) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const accommodations = await this.accommodationService.findAll();
    return res.json(accommodations);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const accommodation = await this.accommodationService.findById(id);
    if (accommodation) {
      return res.json(accommodation);
    }
    return res.status(404).json({ message: 'Accommodation not found' });
  }

  async findByCity(req: Request, res: Response): Promise<Response> {
    const { city } = req.params;
    const accommodation = await this.accommodationService.findByCity(city);
    return res.json(accommodation);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const accommodation = await this.accommodationService.create(req.body);
    return res.status(201).json(accommodation);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const accommodation = await this.accommodationService.update(id, req.body);
    return res.json(accommodation);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.accommodationService.delete(id);
    return res.status(204).send();
  }
}
