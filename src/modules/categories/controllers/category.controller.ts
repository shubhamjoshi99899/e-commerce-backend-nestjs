import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { AdminGuard } from 'src/modules/auth/guards/admin.guards';
import { CreateCategoryDTO } from '../dto/category.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

@Controller({
  path: 'categories',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async fetch() {
    return await this.categoryService.fetchCategories();
  }

  @Get(':categoryId')
  async findById(@Param('categoryId') categoryId: string) {
    return await this.categoryService.findById(categoryId);
  }

  @Post('add')
  @UseGuards(AdminGuard)
  async add(@Body() category: CreateCategoryDTO) {
    return await this.categoryService.store(category);
  }

  @Delete('delete/:categoryId')
  @UseGuards(AdminGuard)
  async delete(@Param('categoryId') categoryId: string) {
    return await this.categoryService.findByIdAndDeleteCategory(categoryId);
  }

  @Put('update/:categoryId')
  @UseGuards(AdminGuard)
  async update(
    @Param('categoryId') categoryId: string,
    @Body() updates: UpdateCategoryDTO,
  ) {
    return await this.categoryService.update(categoryId, updates);
  }
}
