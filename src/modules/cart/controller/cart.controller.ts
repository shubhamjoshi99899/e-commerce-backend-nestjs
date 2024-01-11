import { Controller, Post, Param } from '@nestjs/common';
import { CartService } from '../service/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId/add-product/:productCode')
  async addProductToCart(
    @Param('userId') userId: string,
    @Param('productCode') productCode: number,
  ) {
    console.log('from controller', productCode);
    return this.cartService.addProductToCart(userId, productCode);
  }

  //   @Delete(':cartId/delete-product/:productId')
  //   async deleteFromCart(
  //     @Param('cartId') cartId: string,
  //     @Param('productId') productId: string,
  //   ) {
  //     return this.cartService.deleteFromCart(cartId, productId);
  //   }
}
