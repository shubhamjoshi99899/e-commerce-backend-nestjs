import { Model, Types as MongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import ProductRepositoryInterface from '../product.repository.interface';
import { Product } from '../../schema/product.schema';
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  /**
   * fetch products
   */
  fetchProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  /**
   * find product by id
   */
  findById(id: MongooseTypes.ObjectId): Promise<Product> {
    return this.productModel.findById({ _id: id }).exec();
  }

  /**
   * store a product
   */
  store(data: any): Promise<Product> {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  /**
   * update a product
   */
  async update(id: string, data: any): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedProduct;
  }

  /**
   * delete a product
   */
  async findByIdAndDeleteProduct(id: string): Promise<Product> {
    const result = await this.productModel.findById(id).exec();
    return result;
  }

  async findByProductCode(productCode: number): Promise<Product> {
    const product = await this.productModel.findOne({ productCode }).exec();
    return product;
  }
}
