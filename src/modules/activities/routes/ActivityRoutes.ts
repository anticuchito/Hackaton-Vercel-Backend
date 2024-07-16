import { Router } from 'express';
import { container } from 'tsyringe';
import { ActivityController } from '../controllers/ActivityController';
import { validateId } from '../../../shared/validators/idValidator';

const router = Router();
const activityController = container.resolve(ActivityController);

router.post('/', (req, res, next) => activityController.create(req, res, next));
router.get('/', (req, res, next) => activityController.findAll(req, res, next));
router.get('/:id', validateId, (req, res, next) => activityController.findById(req, res, next));
router.get('/city/:city', (req, res, next) => activityController.findByCity(req, res, next));
router.put('/:id', validateId, (req, res, next) => activityController.update(req, res, next));
router.delete('/:id', validateId, (req, res, next) => activityController.delete(req, res, next));

export default router;
