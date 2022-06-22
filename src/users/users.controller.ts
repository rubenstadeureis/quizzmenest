import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('/update/:id')
  updateUserById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete('/delete/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }

  @Get('/get/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Get('/get-all')
  getAll() {
    return this.usersService.findAll();
  }
}
