import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
import { CartRepository } from './repositories/mongodb/cart.repository';
import { Product, ProductSchema } from '../products/schema/product.schema';
import { User, UserSchema } from '../auth/schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { ProductRepository } from '../products/repositories/mongodb/product.repository';
import { UserRepository } from '../auth/repositories/mongodb/user.repository';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'CartRepositoryInterface',
      useClass: CartRepository,
    },
  ],
})
export class CartModule {}
