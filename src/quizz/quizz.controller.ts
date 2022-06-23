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
import { QuizzService } from './quizz.service';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Post('/create')
  createUsers(@Body() createQuizzDto: CreateQuizzDto) {
    return this.quizzService.create(createQuizzDto);
  }

  @Get('/')
  findAllUsers() {
    return this.quizzService.listQuizz();
  }

  @Get('/:id')
  getOneById(@Param('id') id: number) {
    return this.quizzService.getQuizzById(id);
  }

  @Patch('/update/:id')
  updateUserById(@Param('id') id: number, @Body() update: UpdateQuizzDto) {
    return this.quizzService.updateQuizzById(id, update);
  }

  @Delete('/delete/:id')
  deleteUserById(@Param('id') id: number) {
    return this.quizzService.deleteQuizzById(id);
  }
}
