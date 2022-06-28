import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { OptionEntity } from './entities/option.entity';

@Injectable()
export class OptionRepository {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
  ) {}
  async create(createOptionDto: CreateOptionDto) {
    try {
      const question = this.optionRepository.create({
        ...createOptionDto,
        question: {
          id: createOptionDto.questionId,
        },
      });
      await this.optionRepository.save(question);
      return question;
    } catch (error) {
      console.log('Error creating the question!', error);
      throw new InternalServerErrorException('Error creating the question!');
    }
  }
}
