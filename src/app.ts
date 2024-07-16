import 'reflect-metadata'; 
import './modules/openai/containers/OpenAIContainer';
import './modules/trip/containers/TripContainer';
import './modules/accomodation/containers/AccommodationContainer';
import './modules/activities/containers/ActivityContainer';
import './modules/pointsOfInterest/containers/PointOfInterestContainer';
import './modules/flights/containers/FlightContainer';
import './modules/auth/containers/authContainer';
import './modules/user/containers/userContainer';
import express from 'express';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from'cors';
import { OpenAIController } from './modules/openai/controllers/OpenAIController';
import routes from './shared/routes/index';
import authRoutes from './modules/auth/routes/authRoutes';
import { errorHandler } from './shared/middlewares/errorMiddleware';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();


// Definir los orígenes permitidos
const allowedOrigins = ['http://localhost:3000','*', 'https://rutacuandoesteenproduccion.com'];

// Configurar las opciones de CORS
const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o solicitudes curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

// Usar el middleware de CORS con las opciones configuradas
app.use(cors(corsOptions));
app.use(express.json());

const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

const openAIController = container.resolve(OpenAIController);

// Define las rutas
app.post('/generate-text', (req, res) => openAIController.generateText(req, res));
app.use('/api', routes);
app.use('/auth',authRoutes);

app.use(errorHandler);

export default app;
