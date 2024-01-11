export interface Category {
  name: string;
  code?: string;
  description: string;
}

export type CreateCategoryDAO = Category;
export type UpdateCategoryDAO = Category;
