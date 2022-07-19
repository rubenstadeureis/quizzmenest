import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { QuizzEntity } from './entities/quizz.entity';
import { QuizzRepository } from './quizz.repository';

@Injectable()
export class QuizzService {
  constructor(private quizzRepository: QuizzRepository) {}

  async create(createQuizzDto: CreateQuizzDto): Promise<QuizzEntity> {
    const findNameByQuizz = await this.quizzRepository.hasQuizzByName(
      createQuizzDto.name,
    );
    if (findNameByQuizz) {
      throw new BadRequestException('Name already exists');
    }
    return this.quizzRepository.create(createQuizzDto);
  }

  async getQuizzById(id: number): Promise<QuizzEntity> {
    const quizz = await this.quizzRepository.getQuizzById(id);
    if (!quizz) {
      throw new BadRequestException('Quizz not exist!');
    }
    return quizz;
  }

  async listQuizz(): Promise<QuizzEntity[]> {
    return this.quizzRepository.listQuizz();
  }

  async deleteQuizzById(id: number): Promise<DeleteResult> {
    const quizzExists = this.quizzRepository.deleteQuizzById(id);
    if (!quizzExists) {
      throw new BadRequestException('Quizz not exist!');
    }
    return this.quizzRepository.deleteQuizzById(id);
  }

  async updateQuizzById(
    id: number,
    update: UpdateQuizzDto,
  ): Promise<QuizzEntity> {
    const findQuizz = await this.quizzRepository.quizzExists(id);
    if (!findQuizz) {
      throw new BadRequestException('Quizz not exist!');
    }
    if (update.name) {
      const nameIsInUse = await this.quizzRepository.nameIsInUse(
        update.name,
        id,
      );
      if (nameIsInUse) {
        throw new BadRequestException('Name already in use');
      }
    }
    return await this.quizzRepository.updateQuizzById(update, id);
  }

  async quizzExists(id: number): Promise<boolean> {
    return this.quizzRepository.quizzExists(id);
  }
}
