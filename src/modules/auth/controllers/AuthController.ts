import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/IAuthService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class AuthController {
  constructor(
    @inject('AuthService') private authService: IAuthService
  ) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, name, surname, dateOfBirth } = req.body;
      if (!email || !password || !name || !surname || !dateOfBirth) {
        throw new ValidationError('Email, password, name, surname, and date of birth are required');
      }

      const user = await this.authService.register({
        email,
        password,
        name,
        surname,
        dateOfBirth: new Date(dateOfBirth),
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ValidationError('Email and password are required');
      }

      const { user, token } = await this.authService.login({ email, password });
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(400).json({ message: 'No token provided' });
        return;
      }

      await this.authService.logout(token);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }
}
