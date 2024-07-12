import { Router } from 'express';
import { container } from 'tsyringe';
import { FlightController } from '../controllers/FlightController';

const router = Router();
const flightController = container.resolve(FlightController);

router.post('/', (req, res) => flightController.create(req, res));
router.get('/', (req, res) => flightController.findAll(req, res));
router.get('/:id', (req, res) => flightController.findById(req, res));
router.put('/:id', (req, res) => flightController.update(req, res));
router.delete('/:id', (req, res) => flightController.delete(req, res));

export default router;
