import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repositories/mongodb/product.repository';
import { Product, ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Reflector } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { AdminGuard } from '../auth/guards/admin.guards';
import { UserRepository } from '../auth/repositories/mongodb/user.repository';
import { User, UserSchema } from '../auth/schema/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    AdminGuard,
    Reflector,
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
  exports: [ProductService],
})
export class ProductsModule {}
