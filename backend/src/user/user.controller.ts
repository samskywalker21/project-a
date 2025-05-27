import {Controller, Get, Post, Patch, Param, Body} from '@nestjs/common';
import {UserService} from './user.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('id/:id')
  async getUserById(@Param('id') id: number) {
    console.log('wrong body');
    return await this.userService.getUserById(id);
  }
  // Testing Purposes
  @Get('username')
  async getUserByUsername(@Body() body: any) {
    return await this.userService.getUserByUsername(body.username);
  }

  @Post('add')
  async addUser(@Body() body: CreateUserDto) {
    return await this.userService.addUser(body);
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.userService.updateUser(id, body);
  }
}
