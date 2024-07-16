import { Router } from 'express';
import { container } from 'tsyringe';
import { AccommodationController } from '../controllers/AccommodationController';
import { validateId } from '../../../shared/validators/idValidator';

const router = Router();
const accommodationController = container.resolve(AccommodationController);

router.get('/', (req, res, next) => accommodationController.findAll(req, res, next));
router.get('/:id', validateId, (req, res, next) => accommodationController.findById(req, res, next));
router.get('/city/:city', (req, res, next) => accommodationController.findByCity(req, res, next));
router.post('/', (req, res, next) => accommodationController.create(req, res, next));
router.put('/:id', validateId, (req, res, next) => accommodationController.update(req, res, next));
router.delete('/:id', validateId, (req, res, next) => accommodationController.delete(req, res, next));
export default router;
