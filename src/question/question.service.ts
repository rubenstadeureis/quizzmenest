import { BadRequestException, Injectable } from '@nestjs/common';
import { QuizzService } from 'src/quizz/quizz.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private quizzService: QuizzService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const quizzExists = await this.quizzService.quizzExists(
      createQuestionDto.quizzId,
    );
    if (!quizzExists) {
      throw new BadRequestException('Quizz not exist!');
    }
    return this.questionRepository.create(createQuestionDto);
  }

  async listQuestions(): Promise<QuestionEntity[]> {
    return await this.questionRepository.listQuestions();
  }

  async getQuestionById(id: number): Promise<QuestionEntity> {
    return await this.questionRepository.getQuestionById(id);
  }
}
