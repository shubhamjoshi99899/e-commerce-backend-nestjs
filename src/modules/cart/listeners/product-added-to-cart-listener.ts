import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductAddedToCartEvent } from '../events/product-added-to-cart.event';
import CartRepositoryInterface from '../repositories/cart-repository.interface';

@Injectable()
export class ProductAddedToCartListener {
  private readonly logger = new Logger(ProductAddedToCartListener.name);

  constructor(private readonly cartRepository: CartRepositoryInterface) {}

  @OnEvent('product-added-to-cart', { async: true })
  async handleProductAddedToCartEvent(event: ProductAddedToCartEvent) {
    this.logger.log('product-added-to-cart event received');
    const { userId } = event;
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      this.logger.log('Cart not found');
      return;
    } else {
      const productsInCart = cart.products;
      console.log(productsInCart);
    }
  }
}
