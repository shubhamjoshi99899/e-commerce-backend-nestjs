import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get('')
  async fetch() {
    return this.userService.fetchUsers();
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
}
