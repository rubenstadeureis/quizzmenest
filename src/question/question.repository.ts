import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
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
  async getQuestionById(id: number): Promise<QuestionEntity> {
    try {
      return await this.questionRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error finding question by id');
    }
  }
  async updateQuestionById(
    id: number,
    update: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    try {
      const updateById = await this.getQuestionById(id);
      return await this.questionRepository.save({
        ...updateById,
        ...update,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error finding');
    }
  }
  async deleteQuestionById(id: number): Promise<DeleteResult> {
    try {
      return await this.questionRepository.delete({
        id,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error deleting');
    }
  }
}
