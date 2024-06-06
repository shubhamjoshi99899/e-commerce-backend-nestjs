// cart.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Types as MongooseTypes } from 'mongoose';
import { Cart } from '../schema/cart.schema';
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

  async findCartByUserId(userId: MongooseTypes.ObjectId): Promise<Cart> {
    return await this.cartRepository.findByUserId(userId);
  }

  async createCart(
    userId: MongooseTypes.ObjectId,
    productId: MongooseTypes.ObjectId,
    quantity: number,
  ): Promise<Cart> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const cart = await this.cartRepository.findByUserId(userId);
    if (cart) {
      throw new Error('Cart already exists');
    }
    const product = await this.productRepository.findById(productId);
    const productsToBePushed = {
      products: [{ ...product, productId: productId, quantity: quantity }],
      userId: userId,
      status: 'active',
      totalPrice: product.price * quantity,
      totalQuantity: quantity,
      totalWeight: product.weight * quantity,
    };
    const newCart = await this.cartRepository.store(productsToBePushed);
    return newCart;
  }

  async addProductToCart(
    userId: MongooseTypes.ObjectId,
    productId: MongooseTypes.ObjectId,
    quantity: number,
  ) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const newProduct = await this.productRepository.findById(productId);

    let userCart = await this.cartRepository.findByUserId(userId);

    if (!userCart) {
      // If user doesn't have a cart, create a new one
      userCart = {
        userId: userId,
        products: [],
        status: 'active',
        totalQuantity: 0,
        totalPrice: 0,
        totalWeight: 0,
      };
    }

    let productFound = false;
    userCart.products.forEach((product) => {
      if (product.productId.toString() === productId.toString()) {
        product.quantity += quantity;
        userCart.totalQuantity += quantity;
        userCart.totalPrice += product.price * quantity;
        userCart.totalWeight += product.weight * quantity;
        productFound = true;
      }
    });

    if (!productFound) {
      const productsToBePushed = {
        productId: productId,
        quantity: quantity,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        weight: newProduct.weight,
        productCode: newProduct.productCode,
      };
      userCart.totalQuantity += quantity;
      userCart.totalPrice += newProduct.price * quantity;
      userCart.totalWeight += newProduct.weight * quantity;
      userCart.products.push(productsToBePushed);
    }

    return await this.cartRepository.update(userId, userCart);
  }
}
