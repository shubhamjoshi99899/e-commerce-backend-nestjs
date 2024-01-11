import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import UserRepositoryInterface from '../repositories/user.repository.interface';

@Injectable({ scope: Scope.REQUEST })
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.cookies.userdata._id;
    const user = await this.userRepository.findById(userId);
    return user.isAdmin === true;
  }
}
