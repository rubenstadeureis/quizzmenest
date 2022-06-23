import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/')
  findAllUsers() {
    return this.usersService.listUsers();
  }
  @Get('/:id')
  getOnebyId(@Param('id') id: number) {
    return this.usersService.getUserbyId(id);
  }

  @Patch('/update/:id')
  updateUserById(@Param('id') id: number, @Body() update: UpdateUserDto) {
    return this.usersService.updateUserById(id, update);
  }

  @Delete('/delete/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
}
