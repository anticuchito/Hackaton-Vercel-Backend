import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/IAuthService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../../../shared/utils/jwt';
import { RegisterData, LoginData } from '../interfaces/IAuth';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async register(data: RegisterData): Promise<User> {
    const hashedPassword = await hashPassword(data.password);

    const userCreateInput: Prisma.UserCreateInput = {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      surname: data.surname,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      address: data.address,
      profilePicture: data.profilePicture,
    };

    return this.userRepository.create(userCreateInput);
  }

  async login(data: LoginData): Promise<{ user: User, token: string }> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ userId: user.id });

    return { user, token };
  }
}
