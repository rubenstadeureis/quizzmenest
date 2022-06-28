import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const findQuizzExistsByQuestion =
      await this.questionRepository.hasQuestionName(createQuestionDto.id);
    if (findQuizzExistsByQuestion) {
      throw new BadRequestException('Question Already exist');
    }
    return this.questionRepository.createQuestion(createQuestionDto);
  }

  findAll() {
    return this.questionRepository.findAllQuestion();
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
