import { Injectable, Inject } from '@nestjs/common';
import { Category } from '../schema/category.schema';
import CategoryRepositoryInterface from '../repositories/category.repository.interface';
import { CreateCategoryBO, UpdateCategoryBO } from '../bo/category.bo';
import { CreateCategoryDAO } from '../dao/category.dao';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepositoryInterface')
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  fetchCategories(): Promise<Category[]> {
    return this.categoryRepository.fetchCategories();
  }

  findById(id: string): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  store(data: CreateCategoryBO): Promise<Category> {
    const category: CreateCategoryDAO = {
      ...data,
      code: data.name.replace(/ /g, '_').toUpperCase(),
    };
    return this.categoryRepository.store(category);
  }

  async update(id: string, data: UpdateCategoryBO): Promise<Category> {
    const category: CreateCategoryDAO = {
      ...data,
      code: data.name.replace(/ /g, '_').toUpperCase(),
    };
    return this.categoryRepository.store(category);
  }

  findByIdAndDeleteCategory(id: string): Promise<Category> {
    return this.categoryRepository.findByIdAndDeleteCategory(id);
  }

  findByCategoryCode(categoryCode: string): Promise<Category> {
    return this.categoryRepository.findByCategoryCode(categoryCode);
  }
}
