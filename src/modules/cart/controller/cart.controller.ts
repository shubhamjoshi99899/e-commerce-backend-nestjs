import { Controller, Post, Param, Body } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { Types as MongooseTypes } from 'mongoose';
@Controller({ path: 'cart' })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId/add-product/:productId')
  async addProductToCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const cart = await this.cartService.findCartByUserId(
      new MongooseTypes.ObjectId(userId),
    );
    if (!cart) {
      return this.cartService.createCart(
        new MongooseTypes.ObjectId(userId),
        new MongooseTypes.ObjectId(productId),
        quantity,
      );
    } else {
      return this.cartService.addProductToCart(
        new MongooseTypes.ObjectId(userId),
        new MongooseTypes.ObjectId(productId),
        quantity,
      );
    }
  }

  //   @Delete(':cartId/delete-product/:productId')
  //   async deleteFromCart(
  //     @Param('cartId') cartId: string,
  //     @Param('productId') productId: string,
  //   ) {
  //     return this.cartService.deleteFromCart(cartId, productId);
  //   }
}
