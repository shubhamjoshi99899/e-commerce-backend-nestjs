import { Injectable, Inject } from '@nestjs/common';
import ProductRepositoryInterface from '../repositories/product.repository.interface';
import { Product } from '../schema/product.schema';
import { CreateProductBO } from '../bo/product.bo';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async fetchProducts(): Promise<Product[]> {
    return this.productRepository.fetchProducts();
  }

  async addProduct(productData: CreateProductBO): Promise<Product> {
    const newProduct = this.productRepository.store({
      ...productData,
      productCode: Math.floor(Math.random() * 900) + 100,
    });
    return newProduct;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const deletedProduct =
      await this.productRepository.findByIdAndDeleteProduct(productId);
    return deletedProduct;
  }

  async updateProduct(productId: string, updates: any): Promise<Product> {
    const updatedProduct = await this.productRepository.update(
      productId,
      updates,
    );
    return updatedProduct;
  }
}
