import { Router } from 'express';
import { container } from 'tsyringe';
import { FlightController } from '../controllers/FlightController';
import { validateId } from '../../../shared/validators/idValidator';

const router = Router();
const flightController = container.resolve(FlightController);

router.post('/', (req, res, next) => flightController.create(req, res, next));
router.get('/', (req, res, next) => flightController.findAll(req, res, next));
router.get('/:id',validateId, (req, res, next) => flightController.findById(req, res, next));
router.put('/:id',validateId, (req, res, next) => flightController.update(req, res, next));
router.delete('/:id',validateId, (req, res, next) => flightController.delete(req, res, next));

export default router;
