import { Request, Response, NextFunction } from 'express';

// Middleware de validación de ID
export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
}
