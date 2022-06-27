import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class questionRepository {
  constructor(
    @InjectRepository(Question)
    private question: Repository<Question>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const question = this.question.create(createQuestionDto);
      await this.question.save(question);
      return question;
    } catch (error) {
      console.log('Error creating the question!', error);
      throw new InternalServerErrorException('Error creating the question!');
    }
  }
  async listQuestions(): Promise<Question[]> {
    try {
      return await this.question.find();
    } catch (error) {
      throw new InternalServerErrorException('Error finding questions', error);
    }
  }
}
