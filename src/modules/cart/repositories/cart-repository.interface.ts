import { Cart } from '../schema/cart.schema';
import { Types as MongooseTypes } from 'mongoose';
export default interface CartRepositoryInterface {
  /**
   * find by id
   */
  findById(id: string): Promise<Cart>;

  /**
   * find cart by userId
   */
  findByUserId(userId: MongooseTypes.ObjectId): Promise<Cart>;

  /**
   * store a cart
   */
  store(data: any): Promise<Cart>;

  /**
   * update a cart
   */
  update(id: MongooseTypes.ObjectId, data: Cart): Promise<Cart>;

  /**
   * delete a cart
   */
  findByIdAndDeleteProduct(id: string): Promise<Cart>;
}
