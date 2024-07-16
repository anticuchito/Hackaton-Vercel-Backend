import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

export class AuthenticationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
    this.status = 401;
  }
}

export class AuthorizationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
    this.status = 403;
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Errores conocidos de Prisma
    return res.status(400).json({
      error: {
        type: 'PrismaClientKnownRequestError',
        message: err.message,
        code: err.code,
        meta: err.meta,
      },
    });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    // Errores de validación de Prisma
    return res.status(400).json({
      error: {
        type: 'PrismaClientValidationError',
        message: err.message,
      },
    });
  }

  if (err instanceof ValidationError) {
    // Errores de validación personalizados
    return res.status(err.status).json({
      error: {
        type: 'ValidationError',
        message: err.message,
      },
    });
  }

  if (err instanceof AuthenticationError) {
    // Errores de autenticación
    return res.status(err.status).json({
      error: {
        type: 'AuthenticationError',
        message: err.message,
      },
    });
  }

  if (err instanceof AuthorizationError) {
    // Errores de autorización
    return res.status(err.status).json({
      error: {
        type: 'AuthorizationError',
        message: err.message,
      },
    });
  }

  // Errores generales
  if (err.status) {
    // Si el error tiene una propiedad status, usarla
    return res.status(err.status).json({
      error: {
        type: 'GeneralError',
        message: err.message,
      },
    });
  }

  // Otros errores (500 Internal Server Error)
  return res.status(500).json({
    error: {
      type: 'InternalServerError',
      message: 'Internal Server Error',
      details: err.message,
    },
  });
}
