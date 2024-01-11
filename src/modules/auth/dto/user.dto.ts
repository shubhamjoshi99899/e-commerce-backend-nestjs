import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: number;

  @IsBoolean()
  isAdmin: boolean;
}
