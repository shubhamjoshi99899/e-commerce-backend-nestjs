import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import UserRepositoryInterface from '../repositories/user.repository.interface';
import { PassportSerializer } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService extends PassportSerializer {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtStrategy: JwtStrategy,
    private readonly userService: UserService,
  ) {
    super();
  }

  /**
   * serializing and deserializing
   */
  serializeUser(user: any, done: any) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: any) {
    const user = await this.userRepository.findById(payload.user._id);
    return user ? done(null, user) : done(null, null);
  }

  /**
   * login
   */
  async login(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Password');
    }

    const token = await this.jwtStrategy.generateToken(user.id);

    return { user: user, token: token };
  }

  /**
   * validating google user
   */
  async validateUser(profile: Profile, accessToken: any) {
    const email = profile.emails[0].value;
    const displayName = profile.displayName;
    const googleId = profile.id;
    let user = await this.userRepository.findByEmail(email);

    const token = await this.jwtStrategy.generateToken(accessToken);

    if (!user) {
      user = await this.userRepository.store({
        name: displayName,
        email: email,
        googleId: googleId,
      });

      return { message: 'created google user', user, token };
    } else {
      return { message: 'user already exists', user, token };
    }
  }
}
