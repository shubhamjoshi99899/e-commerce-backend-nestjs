import { CreateCategoryDAO, UpdateCategoryDAO } from '../dao/category.dao';
import { Category } from '../schema/category.schema';

export default interface CategoryRepositoryInterface {
  /**
   * fetch categories
   */
  fetchCategories(): Promise<Category[]>;

  /**
   * find by id
   */
  findById(id: string): Promise<Category>;

  /**
   * store a category
   */
  store(data: CreateCategoryDAO): Promise<Category>;

  /**
   * update a category
   */
  update(id: string, data: UpdateCategoryDAO): Promise<Category>;

  /**
   * delete a category
   */
  findByIdAndDeleteCategory(id: string): Promise<Category>;

  /**
   * find by category code
   */
  findByCategoryCode(categoryCode: string): Promise<Category>;
}
