import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionService } from 'src/question/question.service';
import { DeleteResult } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { OptionEntity } from './entities/option.entity';
// import { UpdateOptionDto } from './dto/update-option.dto';
import { OptionRepository } from './option.repository';

@Injectable()
export class OptionService {
  constructor(
    private optionRepository: OptionRepository,
    private questionService: QuestionService,
  ) {}

  async create(createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    const optionExists = await this.questionService.getQuestionById(
      createOptionDto.questionId,
    );
    if (!optionExists) throw new BadRequestException('Option not exist!');

    return await this.optionRepository.create(createOptionDto);
  }

  async listOptions(): Promise<OptionEntity[]> {
    return await this.optionRepository.listOptions();
  }

  async findOne(id: number): Promise<OptionEntity> {
    const optionExist = await this.optionRepository.optionExists(id);

    if (!optionExist) throw new BadRequestException('Option not exists!');

    return this.optionRepository.getOptionsById(id);
  }

  async update(
    id: number,
    updateOptionDto: UpdateOptionDto,
  ): Promise<OptionEntity> {
    return await this.optionRepository.updateOptionById(id, updateOptionDto);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.optionRepository.deleteOptionById(id);
  }
}
