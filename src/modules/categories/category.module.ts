import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/mongodb/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { AuthModule } from '../auth/auth.module';
import { Reflector } from '@nestjs/core';
import { AdminGuard } from '../auth/guards/admin.guards';
import { UserRepository } from '../auth/repositories/mongodb/user.repository';
import { User, UserSchema } from '../auth/schema/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    AdminGuard,
    Reflector,
    {
      provide: 'CategoryRepositoryInterface',
      useClass: CategoryRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    CategoryService,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
