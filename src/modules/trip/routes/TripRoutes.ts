import { Router } from 'express';
import { container } from 'tsyringe';
import { TripController } from '../controllers/TripController';
import { validateId } from '../../../shared/validators/idValidator';

const router = Router();
const tripController = container.resolve(TripController);

router.post('/', (req, res, next) => tripController.createTrip(req, res, next));
router.get('/', (req, res, next) => tripController.getAllTrips(req, res, next));
router.get('/:id', validateId, (req, res, next) => tripController.getTripById(req, res, next));
router.get('/city/:city', (req, res, next) => tripController.getTripsByCity(req, res, next));
router.put('/:id', validateId, (req, res, next) => tripController.updateTrip(req, res, next));
router.delete('/:id', validateId, (req, res, next) => tripController.deleteTrip(req, res, next));

export default router;
