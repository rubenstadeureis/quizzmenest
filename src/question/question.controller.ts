import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/create')
  createQuestions(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }
  @Get()

  getAllQuestions() {
    return this.questionService.listQuestions();
  }
  @Get('/:id')
  getOneQuestionById(@Param('id') id: number) {
    return this.questionService.getQuestionById(id);
  }
  @Patch('/update/:id')
  updateUserById(@Param('id') id: number, @Body() update: UpdateQuestionDto) {
    return this.questionService.updateQuestionById(id, update);
  }
  @Delete('/delete/:id')
  deleteQuestion(@Param('id') id: number) {
    return this.questionService.deleteQuestionById(id);
  }


}
