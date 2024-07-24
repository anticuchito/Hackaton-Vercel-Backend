// routes/cityRoutes.ts
import { Router } from 'express';
import { container } from 'tsyringe';
import { CityController } from '../controllers/CityController';

const router = Router();
const cityController = container.resolve(CityController);

router.post('/', (req, res, next) => cityController.createCity(req, res, next));
router.get('/:id', (req, res, next) => cityController.getCityById(req, res, next));
router.get('/name/:name', (req, res, next) => cityController.getCityByName(req, res, next)); 
router.get('/', (req, res, next) => cityController.getAllCities(req, res, next));

export default router;
