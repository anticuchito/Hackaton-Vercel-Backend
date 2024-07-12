import { Router } from 'express';
import { container } from 'tsyringe';
import { AccommodationController } from '../controllers/AccommodationController';

const router = Router();
const accommodationController = container.resolve(AccommodationController);

router.get('/accommodations', (req, res) => accommodationController.findAll(req, res));
router.get('/accommodations/:id', (req, res) => accommodationController.findById(req, res));
router.post('/accommodations', (req, res) => accommodationController.create(req, res));
router.put('/accommodations/:id', (req, res) => accommodationController.update(req, res));
router.delete('/accommodations/:id', (req, res) => accommodationController.delete(req, res));

export default router;
