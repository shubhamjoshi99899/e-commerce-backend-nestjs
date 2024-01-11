import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { User, UserSchema } from './schema/user.schema';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repositories/mongodb/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { Reflector } from '@nestjs/core';
import { AdminGuard } from './guards/admin.guards';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => {
        return {
          secret: configService.jwtCredentials.jwtSecret,
          signOptions: { expiresIn: configService.jwtCredentials.jwtExpiry },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    GoogleStrategy,
    JwtStrategy,
    AdminGuard,
    Reflector,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
  exports: [AuthService, JwtStrategy, UserService],
})
export class AuthModule {}
