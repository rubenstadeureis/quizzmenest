import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
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

  async listOptions(): Promise<OptionEntity[]> {
    try {
      return await this.optionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error finding options', error);
    }
  }

  async getOptionsById(id: number): Promise<OptionEntity> {
    try {
      return await this.optionRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error found option by id', error);
    }
  }
  async optionExists(id: number): Promise<boolean> {
    try {
      const countOptionById = await this.optionRepository.count({
        where: {
          id,
        },
      });
      return countOptionById > 0;
    } catch (error) {
      throw new InternalServerErrorException('Error counting option');
    }
  }
  async updateOptionById(
    id: number,
    update: UpdateOptionDto,
  ): Promise<OptionEntity> {
    try {
      const idExists = await this.getOptionsById(id);
      return await this.optionRepository.save({
        ...idExists,
        ...update,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error finding option');
    }
  }
  async deleteOptionById(id: number): Promise<DeleteResult> {
    try {
      return await this.optionRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting option');

    }
  }
}
