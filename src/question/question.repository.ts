import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const question = this.questionRepository.create({
        ...createQuestionDto,
        quizz: {
          id: createQuestionDto.quizzId,
        },
      });
      await this.questionRepository.save(question);
      return question;
    } catch (error) {
      console.log('Error creating the question!', error);
      throw new InternalServerErrorException('Error creating the question!');
    }
  }
  async listQuestions(): Promise<QuestionEntity[]> {
    try {
      return await this.questionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error finding questions', error);
    }
  }
}
