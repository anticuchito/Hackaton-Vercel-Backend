import { Router } from 'express';
import { container } from 'tsyringe';
import { PointOfInterestController } from '../controllers/PointOfInterestController';

const router = Router();
const pointOfInterestController = container.resolve(PointOfInterestController);

router.post('/', (req, res) => pointOfInterestController.create(req, res));
router.get('/', (req, res) => pointOfInterestController.findAll(req, res));
router.get('/:id', (req, res) => pointOfInterestController.findById(req, res));
router.put('/:id', (req, res) => pointOfInterestController.update(req, res));
router.delete('/:id', (req, res) => pointOfInterestController.delete(req, res));

export default router;
