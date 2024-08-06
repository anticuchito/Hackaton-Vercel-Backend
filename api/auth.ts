import 'reflect-metadata';
import '../src/shared/containers';
import express from 'express';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../src/modules/auth/routes/authRoutes';
import { errorHandler } from '../src/shared/middlewares/errorMiddleware';

dotenv.config();

const app = express();

// Definir los orígenes permitidos
const allowedOrigins = [
  'http://localhost:3000',
  '*',
  'hackathon-vercel-front.vercel.app',
];

// Configurar las opciones de CORS
const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o solicitudes curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Usar el middleware de CORS con las opciones configuradas
app.use(cors(corsOptions));
app.use(express.json());

const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// rutas
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
