import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(@Body() user: User): User {
    return this.userService.addUser(user);
  }

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Put(':id')
  update(@Param('id') id: any, @Body() user: User): void {
    this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.userService.remove(id);
  }
}
