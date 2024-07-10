// src/app.ts

import express from 'express';
import 'reflect-metadata'; 
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });


export default app;
