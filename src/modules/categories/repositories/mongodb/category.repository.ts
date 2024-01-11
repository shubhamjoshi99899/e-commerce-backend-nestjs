import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../schema/category.schema';
import CategoryRepositoryInterface from '../category.repository.interface';
import { CreateCategoryDAO, UpdateCategoryDAO } from '../../dao/category.dao';

export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  /**
   * fetch Categories
   */
  fetchCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  /**
   * find Category by id
   */
  findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  /**
   * store a Category
   */
  store(data: CreateCategoryDAO): Promise<Category> {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  /**
   * update a Category
   */
  async update(id: string, data: UpdateCategoryDAO): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedCategory;
  }

  /**
   * delete a Category
   */
  async findByIdAndDeleteCategory(id: string): Promise<Category> {
    const result = await this.categoryModel.findById(id).exec();
    return result;
  }

  async findByCategoryCode(CategoryCode: string): Promise<Category> {
    const Category = await this.categoryModel.findOne({ CategoryCode }).exec();
    return Category;
  }
}
