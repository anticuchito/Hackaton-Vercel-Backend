import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/IAuthService';

@injectable()
export class AuthController {
  constructor(
    @inject('AuthService') private authService: IAuthService
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, name, surname, dateOfBirth, phoneNumber, address, profilePicture } = req.body;
    const user = await this.authService.register({
      email,
      password,
      name,
      surname,
      dateOfBirth: new Date(dateOfBirth),
      phoneNumber,
      address,
      profilePicture,
    });
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { user, token } = await this.authService.login({ email, password });
    return res.status(200).json({ user, token });
  }
}
