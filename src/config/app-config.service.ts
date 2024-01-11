import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  private getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    return value.toString().replace(/\\n/g, '\n');
  }

  get mongooseConfig(): MongooseModuleOptions {
    return {
      uri: this.getString('MONGODB_URI'),
    };
  }

  get gcpCredentials(): {
    clientId: string;
    clientSecret: string;
  } {
    return {
      clientId: this.getString('GOOGLE_CLIENT_ID'),
      clientSecret: this.getString('GOOGLE_CLIENT_SECRET'),
    };
  }

  get jwtCredentials(): {
    jwtSecret: string;
    jwtExpiry: string;
  } {
    return {
      jwtSecret: this.getString('JWT_SECRET'),
      jwtExpiry: this.getString('JWT_EXPIRY'),
    };
  }

  get expressSessionCredentials(): {
    sessionSecret: string;
  } {
    return {
      sessionSecret: this.getString('SESSION_SECRET'),
    };
  }
}
