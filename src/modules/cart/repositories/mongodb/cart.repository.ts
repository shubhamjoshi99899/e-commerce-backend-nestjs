import { Model } from 'mongoose';
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
    // console.log("here id",id)
    // const cart=await this.cartModel.findOne({_id:id}).exec();
    // console.log("my cart", await this.cartModel.findById("652ee98341e99df3c7e71a76").exec())
    // return cart
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
  findByUserId(userId: string): Promise<Cart> {
    return this.cartModel.findOne({ userId }).exec();
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
  async update(id: string, data: any): Promise<Cart> {
    const updatedCart = await this.cartModel
      .findByIdAndUpdate(id, data, { new: true })
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
