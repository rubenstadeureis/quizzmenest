import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionService } from 'src/question/question.service';
import { CreateOptionDto } from './dto/create-option.dto';
// import { UpdateOptionDto } from './dto/update-option.dto';
import { OptionRepository } from './option.repository';

@Injectable()
export class OptionService {
  constructor(
    private optionRepository: OptionRepository,
    private questionService: QuestionService,
  ) {}
  async create(createOptionDto: CreateOptionDto) {
    const optionExists = await this.questionService.questionExists(
      createOptionDto.questionId,
    );
    if (!optionExists) {
      throw new BadRequestException('Option not exist!');
    }
    return this.optionRepository.create(createOptionDto);
  }
  async listOption() {
    return this.optionRepository.listOptions();
  }

  // findAll() {
  //   return `This action returns all option`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} option`;
  // }

  // update(id: number, updateOptionDto: UpdateOptionDto) {
  //   return `This action updates a #${id} option`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} option`;
  // }
}
