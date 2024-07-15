import { Router } from 'express';
import { container } from 'tsyringe';
import { AccommodationController } from '../controllers/AccommodationController';

const router = Router();
const accommodationController = container.resolve(AccommodationController);

router.get('/', (req, res) => accommodationController.findAll(req, res));
router.get('/:id', (req, res) => accommodationController.findById(req, res));
router.get('/city/:city', (req, res) => accommodationController.findByCity(req, res)); 
router.post('/', (req, res) => accommodationController.create(req, res));
router.put('/:id', (req, res) => accommodationController.update(req, res));
router.delete('/:id', (req, res) => accommodationController.delete(req, res));

export default router;
