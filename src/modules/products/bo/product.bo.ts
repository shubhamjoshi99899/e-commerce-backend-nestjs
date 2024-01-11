export interface Product {
  name: string;
  description: string;
  price: number;
  weight: number;
  category: string;
  quantity: number;
  images?: string[];
}

export type CreateProductBO = Product;
