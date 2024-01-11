import { Injectable, Inject } from '@nestjs/common';

import { User } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import UserRepositoryInterface from '../repositories/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(
    userDto: Partial<User>,
  ): Promise<{ user: any; message: string }> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = this.userRepository.store({
      ...userDto,
      password: hashedPassword,
    });

    return { user: user, message: 'User Registration successful' };
  }

  async fetchUsers(): Promise<User[]> {
    return this.userRepository.fetchUsers();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
