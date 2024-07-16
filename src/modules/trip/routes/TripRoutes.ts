import { Router } from 'express';
import { container } from 'tsyringe';
import { TripController } from '../controllers/TripController';
import { validateId } from '../../../shared/validators/idValidator';

const router = Router();
const tripController = container.resolve(TripController);

router.post('/trips', (req, res, next) => tripController.createTrip(req, res, next));
router.get('/trips/:id', validateId, (req, res, next) => tripController.getTripById(req, res, next));
router.get('/trips/city/:city', (req, res, next) => tripController.getTripsByCity(req, res, next));
router.put('/trips/:id', validateId, (req, res, next) => tripController.updateTrip(req, res, next));
router.delete('/trips/:id', validateId, (req, res, next) => tripController.deleteTrip(req, res, next));

export default router;
