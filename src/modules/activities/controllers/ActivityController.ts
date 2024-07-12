import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IActivityService } from '../interfaces/IActivityService';

@injectable()
export class ActivityController {
  constructor(
    @inject('ActivityService')
    private activityService: IActivityService
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const activity = await this.activityService.create(req.body);
    return res.status(201).json(activity);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const activities = await this.activityService.findAll();
    return res.json(activities);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const activity = await this.activityService.findById(id);
    if (activity) {
      return res.json(activity);
    }
    return res.status(404).json({ message: 'Activity not found' });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const activity = await this.activityService.update(id, req.body);
    return res.json(activity);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.activityService.delete(id);
    return res.status(204).send();
  }
}
