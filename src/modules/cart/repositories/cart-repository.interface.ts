import { Cart } from '../schema/cart.schema';

export default interface CartRepositoryInterface {
  /**
   * find by id
   */
  findById(id: string): Promise<Cart>;

  /**
   * find cart by userId
   */
  findByUserId(userId: string): Promise<Cart>;

  /**
   * store a cart
   */
  store(data: any): Promise<Cart>;

  /**
   * update a cart
   */
  update(id: string, data: any): Promise<Cart>;

  /**
   * delete a cart
   */
  findByIdAndDeleteProduct(id: string): Promise<Cart>;
}
