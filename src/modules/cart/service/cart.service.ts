// cart.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { CartProduct } from '../schema/cart.schema';
import CartRepositoryInterface from '../repositories/cart-repository.interface';
import ProductRepositoryInterface from 'src/modules/products/repositories/product.repository.interface';
import UserRepositoryInterface from 'src/modules/auth/repositories/user.repository.interface';

@Injectable()
export class CartService {
  constructor(
    @Inject('CartRepositoryInterface')
    private readonly cartRepository: CartRepositoryInterface,
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductRepositoryInterface,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async addProductToCart(userId: string, productCode: number) {
    // const cart = await this.cartRepository.findByUserId(userId);
    const user = await this.userRepository.findById(userId);
    const product = await this.productRepository.findByProductCode(productCode);

    console.log('cartid', user);
    if (!user) {
      // Handle the case when the user is not found
      throw new Error('User not found');
    } else {
      if (!user.cartId) {
        // const product = await this.productRepository.findById(productId);
        console.log('searching for product', product);

        if (product) {
          const productToBePushed = {
            name: product.name,
            description: product.description,
            price: product.price,
            weight: product.weight,
            quantity: product.quantity,
            productCode: product.productCode,
          };
          const newCartId = new Types.ObjectId();
          const newCart = await this.cartRepository.store({
            _id: newCartId,
            userId: userId,
            products: [productToBePushed],
            status: 'active',
            totalPrice: product.price,
            totalQuantity: 1,
            totalWeight: product.weight,
          });
          await this.userRepository.update(userId, { cartId: newCartId });

          return newCart;
        } else {
          console.log('product unavailable, choose another item');
        }
      } else {
        const cart = await this.cartRepository.findById(user.cartId.toString());
        const productIndex = cart?.products?.findIndex(
          (product) => product.productCode === Number(productCode),
        );

        console.log('Products array', cart.products);
        console.log('index', productIndex);
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += 1;
        } else {
          console.log('producttoaddagain', product);
          const productToPush = {
            name: product.name,
            description: product.description,
            price: product.price,
            weight: product.weight,
            quantity: product.quantity,
            productCode: product.productCode,
          };
          cart.products.push(productToPush as CartProduct);
          console.log('topuuu', productToPush);
        }
        await this.cartRepository.update(cart._id, {
          products: cart.products,
          totalPrice: cart.totalPrice + product.price,
          totalQuantity: cart.totalQuantity + 1,
          totalWeight: cart.totalWeight + product.weight,
        });
        return cart;
      }
    }
  }

  //   async deleteFromCart(cartId: string, productId: string) {
  //     const cart = await this.cartModel.findById(cartId);

  //     if (!cart) {
  //       // Handle error: Cart not found
  //     }

  //     // Find the index of the product in the cart
  //     const productIndex = cart.products.findIndex(
  //       (product) => product.productId.toString() === productId,
  //     );

  //     if (productIndex === -1) {
  //       // Handle error: Product not found in the cart
  //     }

  //     // Remove the product from the cart
  //     cart.products.splice(productIndex, 1);

  //     // Save the updated cart
  //     await cart.save();
  //   }
}
