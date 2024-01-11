import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ProductService } from '../service/product.service';
import { AdminGuard } from 'src/modules/auth/guards/admin.guards';

@Controller({
  path: 'products',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async fetch() {
    return await this.productService.fetchProducts();
  }

  @Post('add')
  @UseGuards(AdminGuard)
  async add(@Body() createProductDto: CreateProductDto) {
    return await this.productService.addProduct(createProductDto);
  }

  @Delete('delete/:productId')
  @UseGuards(AdminGuard)
  async delete(@Param('productId') productId: string) {
    return await this.productService.deleteProduct(productId);
  }

  @Put('update/:productId')
  @UseGuards(AdminGuard)
  async update(@Param('productId') productId: string, @Body() updates: any) {
    return await this.productService.updateProduct(productId, updates);
  }
}
