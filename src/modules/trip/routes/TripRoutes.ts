import { Router } from 'express';
import { container } from 'tsyringe';
import { TripController } from '../controllers/TripController';

const router = Router();
const tripController = container.resolve(TripController);

router.post('/trips', (req, res) => tripController.createTrip(req, res));
router.get('/trips/:id', (req, res) => tripController.getTripById(req, res));
router.get('/trips/city/:city', (req, res) => tripController.getTripsByCity(req, res));

export default router;
