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

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    try {
      const question = this.questionRepository.create(createQuestionDto);
      await this.questionRepository.save(question);
      return question;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar Questão ');
    }
  }

  async hasQuestionName(id: number): Promise<boolean> {
    try {
      const verifyQuestionExists = await this.questionRepository.count({
        where: { id },
      });
      return verifyQuestionExists > 0;
    } catch (error) {
      throw new InternalServerErrorException('Erro, Questão já existente');
    }
  }

  async findAllQuestion(): Promise<QuestionEntity[]> {
    try {
      return await this.questionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao listar todas as questões',
      );
    }
  }
}
