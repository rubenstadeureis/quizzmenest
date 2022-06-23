import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { UsersService } from './quizz.service';
@Controller('quizz')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  createUsers(@Body() createQuizzDto: CreateQuizzDto) {
    return this.usersService.create(createQuizzDto);
  }

  @Get('/')
  findAllUsers() {
    return this.usersService.listQuizz();
  }
  @Get('/:id')
  getOnebyId(@Param('id') id: number) {
    return this.usersService.getQuizzbyId(id);
  }

  @Patch('/update/:id')
  updateUserById(@Param('id') id: number, @Body() update: UpdateQuizzDto) {
    return this.usersService.updateQuizzById(id, update);
  }

  @Delete('/delete/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteQuizzById(id);
  }
}
