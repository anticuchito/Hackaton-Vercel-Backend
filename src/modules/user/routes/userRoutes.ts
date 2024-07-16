import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = container.resolve(UserController);

router.post('/favorites', (req, res, next) => userController.addFavoriteTrip(req, res, next));
router.get('/favorites/:userId', (req, res, next) => userController.getFavorites(req, res, next));
router.get('/tripsCreated/:userId', (req, res, next) => userController.getTripsCreated(req, res, next));
router.delete('/favorites', (req, res, next) => userController.removeFavoriteTrip(req, res, next));

export default router;
