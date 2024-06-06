import { Model, Types as MongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import CartRepositoryInterface from '../cart-repository.interface';
import { Cart } from '../../schema/cart.schema';

export class CartRepository implements CartRepositoryInterface {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<Cart>,
  ) {}

  /**
   * find product by id
   */
  findById(id: string): Promise<Cart> {
    try {
      const cart = this.cartModel.findById(id).exec();
      return cart;
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  }

  /**
   * find cart by userId
   */
  findByUserId(userId: MongooseTypes.ObjectId): Promise<Cart> {
    return this.cartModel.findOne({ userId: userId }).exec();
  }

  /**
   * store a product
   */
  store(data: any): Promise<Cart> {
    const newProduct = new this.cartModel(data);
    return newProduct.save();
  }

  /**
   * update a product
   */
  async update(
    userId: MongooseTypes.ObjectId,
    updatedCartData: Partial<Cart>,
  ): Promise<Cart | null> {
    const updatedCart = await this.cartModel
      .findOneAndUpdate({ userId: userId }, updatedCartData, { new: true })
      .exec();
    return updatedCart;
  }

  /**
   * delete a product
   */
  async findByIdAndDeleteProduct(id: string): Promise<Cart> {
    const removedProduct = await this.cartModel.findById(id).exec();
    return removedProduct;
  }
}
