import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
