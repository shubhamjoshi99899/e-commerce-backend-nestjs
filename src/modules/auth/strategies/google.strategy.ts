import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../service/auth.service';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authServie: AuthService,
    private readonly appConfigService: AppConfigService,
  ) {
    super({
      clientID: appConfigService.gcpCredentials.clientId,
      clientSecret: appConfigService.gcpCredentials.clientSecret,
      callbackURL: 'http://localhost:5000/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return await this.authServie.validateUser(profile, accessToken);
  }
}
