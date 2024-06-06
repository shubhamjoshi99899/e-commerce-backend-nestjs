import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/app-config.service';
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/categories/category.module';
import { CartModule } from './modules/cart/cart.module';
@Module({
  imports: [
    AuthModule,
    ProductsModule,
    CategoryModule,
    CartModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => {
        return {
          uri: configService.mongooseConfig.uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [AppConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
