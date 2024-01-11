import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
