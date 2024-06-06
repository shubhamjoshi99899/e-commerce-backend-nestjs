import { Types as MongooseTypes } from 'mongoose';
import { Product } from '../schema/product.schema';

export default interface ProductRepositoryInterface {
  /**
   * fetch products
   */
  fetchProducts(): Promise<Product[]>;
  /**
   * find by id
   */
  findById(id: MongooseTypes.ObjectId): Promise<Product>;

  /**
   * store a user
   */
  store(data: any): Promise<Product>;

  /**
   * update a user
   */
  update(id: string, data: any): Promise<Product>;

  /**
   * delete a product
   */
  findByIdAndDeleteProduct(id: string): Promise<Product>;

  /**
   * find by product code
   */

  findByProductCode(productCode: number): Promise<Product>;
}
