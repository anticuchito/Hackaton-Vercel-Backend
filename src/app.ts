import express from 'express';
import 'reflect-metadata'; 
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import './modules/openai/containers/OpenAIContainer';
import './modules/trip/containers/TripContainer';
import './modules/accomodation/containers/AccommodationContainer';
import './modules/activities/containers/ActivityContainer';
import './modules/pointsOfInterest/containers/PointOfInterestContainer';
import { OpenAIController } from './modules/openai/controllers/OpenAIController';
import routes from './shared/routes/index';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

const openAIController = container.resolve(OpenAIController);

// Define las rutas
app.post('/generate-text', (req, res) => openAIController.generateText(req, res));
app.use('/api', routes);

export default app;
