import { Router } from 'express';
import { container } from 'tsyringe';
import { PointOfInterestController } from '../controllers/PointOfInterestController';
import { validateId } from '../../../shared/validators/idValidator';

const router = Router();
const pointOfInterestController = container.resolve(PointOfInterestController);

router.post('/', (req, res, next) => pointOfInterestController.create(req, res, next));
router.get('/', (req, res, next) => pointOfInterestController.findAll(req, res, next));
router.get('/:id', validateId,(req, res, next) => pointOfInterestController.findById(req, res, next));
router.get('/city/:city', (req, res, next) => pointOfInterestController.findByCity(req, res, next));
router.get('/slug/:slug', (req, res, next) => pointOfInterestController.findBySlug(req, res, next));
router.put('/:id', validateId,(req, res, next) => pointOfInterestController.update(req, res, next));
router.delete('/:id',validateId, (req, res, next) => pointOfInterestController.delete(req, res, next));

export default router;
