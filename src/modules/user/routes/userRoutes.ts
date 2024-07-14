import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = container.resolve(UserController);

router.post('/favorites', (req, res) => userController.addFavoriteTrip(req, res));
router.get('/favorites/:userId', (req, res) => userController.getFavorites(req, res));
router.get('/tripsCreated/:userId', (req, res) => userController.getTripsCreated(req, res));
router.delete('/favorites', (req, res) => userController.removeFavoriteTrip(req, res));

export default router;
