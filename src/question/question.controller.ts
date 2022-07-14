import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/create')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }
  @Get()
  getAll() {
    return this.questionService.listQuestions();
  }
  @Get('/:id')
  getOneQuestionById(@Param('id') id: number) {
    return this.questionService.getQuestionById(id);
  }
  //  @Patch('/update/:id')
  // updateUserById(@Param('id') id: number, @Body() update: UpdateUserDto) {
  //   return this.usersService.updateUserById(id, update);
  // }
}
