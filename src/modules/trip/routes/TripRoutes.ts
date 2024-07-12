import { Router } from 'express';
import { container } from 'tsyringe';
import { TripController } from '../controllers/TripController';

const router = Router();
const tripController = container.resolve(TripController);

router.post('/trips', (req, res) => tripController.createTrip(req, res));

export default router;
