import { User } from '@prisma/client';
import { RegisterData, LoginData } from './IAuth';

export interface IAuthService {
  register(data: RegisterData): Promise<User>;
  login(data: LoginData): Promise<{ user: User, token: string }>;
  logout(token: string): Promise<void>;
}
