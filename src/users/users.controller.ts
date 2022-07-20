import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

// @UseGuards(LocalAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/create')
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAllUsers() {
    return this.usersService.listUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOnebyId(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  updateUserById(@Param('id') id: number, @Body() update: UpdateUserDto) {
    return this.usersService.updateUserById(id, update);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
}
