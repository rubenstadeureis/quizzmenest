import {
  BadRequestException,
  Injectable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  InternalServerErrorException,
} from '@nestjs/common';
import { QuizzService } from 'src/quizz/quizz.service';
import { DeleteResult } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
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
    const countIdQuestion = await this.questionRepository.questionExists(id);

    if (!countIdQuestion) throw new BadRequestException('Id not exists');

    return await this.questionRepository.getQuestionById(id);
  }
  async updateQuestionById(
    id: number,
    update: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    return await this.questionRepository.updateQuestionById(id, update);
  }
  async deleteQuestionById(id: number): Promise<DeleteResult> {
    return await this.questionRepository.deleteQuestionById(id);
  }
}
