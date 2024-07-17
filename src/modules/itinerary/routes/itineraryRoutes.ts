import { Router } from 'express';
import { container } from 'tsyringe';
import { ItineraryController } from '../controllers/itineraryController';

const router = Router();
const itineraryController = container.resolve(ItineraryController);

router.post('/', (req, res, next) => itineraryController.create(req, res, next));
router.get('/', (req, res, next) => itineraryController.findAll(req, res, next));
router.get('/:id', (req, res, next) => itineraryController.findById(req, res, next));
router.get('/city/:city', (req, res, next) => itineraryController.findByCity(req, res, next));
router.put('/:id', (req, res, next) => itineraryController.update(req, res, next));
router.delete('/:id', (req, res, next) => itineraryController.delete(req, res, next));

export default router;
