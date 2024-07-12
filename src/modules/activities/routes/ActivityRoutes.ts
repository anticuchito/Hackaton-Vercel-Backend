import { Router } from 'express';
import { container } from 'tsyringe';
import { ActivityController } from '../controllers/ActivityController';

const router = Router();
const activityController = container.resolve(ActivityController);

router.post('/', (req, res) => activityController.create(req, res));
router.get('/', (req, res) => activityController.findAll(req, res));
router.get('/:id', (req, res) => activityController.findById(req, res));
router.put('/:id', (req, res) => activityController.update(req, res));
router.delete('/:id', (req, res) => activityController.delete(req, res));

export default router;
