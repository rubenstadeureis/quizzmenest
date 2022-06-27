import { questionRepository } from './question.repository';
import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: questionRepository) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.create(createQuestionDto);
  }
  listQuestions() {
    return this.questionRepository.listQuestions();
  }
}
