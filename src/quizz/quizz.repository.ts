import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { QuizzEntity } from './entities/quizz.entity';

@Injectable()
export class QuizzRepository {
  constructor(
    @InjectRepository(QuizzEntity)
    private quizzRepository: Repository<QuizzEntity>,
  ) {}

  async create(createQuizzDto: CreateQuizzDto) {
    try {
      const quizz = this.quizzRepository.create(createQuizzDto);
      await this.quizzRepository.save(quizz);
      return quizz;
    } catch (error) {
      throw new InternalServerErrorException('Erro na criação do quizz');
    }
  }

  async hasQuizzByName(name: string): Promise<boolean> {
    try {
      const countById = await this.quizzRepository.count({
        where: {
          name,
        },
      });
      return countById > 0;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao verificar quizz pelo nome',
      );
    }
  }

  async listQuizz(): Promise<QuizzEntity[]> {
    try {
      return await this.quizzRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar quizzes', error);
    }
  }

  async getQuizzById(id: number): Promise<QuizzEntity> {
    try {
      return await this.quizzRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao encontrar o quizz número ${id}`,
      );
    }
  }

  async quizzExists(id: number): Promise<boolean> {
    try {
      const quizzFoundedByQuizz = await this.quizzRepository.count({
        where: {
          id,
        },
      });
      return quizzFoundedByQuizz > 0;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao verificar o Id do quizz');
    }
  }

  async deleteQuizzById(id: number): Promise<boolean> {
    try {
      return !!(await this.quizzRepository.delete(id));
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar quizz');
    }
  }

  async updateQuizzById(updateQuizz: UpdateQuizzDto, id: number) {
    try {
      const foundedOneQuizzById = await this.quizzRepository.findOne({
        where: {
          id,
        },
      });
      return await this.quizzRepository.save({
        ...foundedOneQuizzById,
        ...updateQuizz,
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar o quizz');
    }
  }

  async nameIsInUse(name: string, id: number): Promise<boolean> {
    try {
      const countById = await this.quizzRepository.count({
        where: {
          name,
          id: Not(id),
        },
      });
      return countById > 0;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao verificar disponibilidade do nome',
      );
    }
  }
}
