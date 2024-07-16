import { Router } from 'express';
import { container } from 'tsyringe';
import { RestaurantController } from '../controllers/restaurantController';
import { validateId } from '../../../shared/validators/idValidator';

const router = Router();
const restaurantController = container.resolve(RestaurantController);

router.post('/', (req, res, next) => restaurantController.create(req, res, next));
router.get('/', (req, res, next) => restaurantController.findAll(req, res, next));
router.get('/:id', validateId, (req, res, next) => restaurantController.findById(req, res, next));
router.get('/city/:city', (req, res, next) => restaurantController.findByCity(req, res, next));
router.put('/:id', validateId, (req, res, next) => restaurantController.update(req, res, next));
router.delete('/:id', validateId, (req, res, next) => restaurantController.delete(req, res, next));

export default router;
