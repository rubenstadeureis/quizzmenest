import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { QuizzEntity } from './entities/quizz.entity';

@Injectable()
export class QuizzRepository {
  constructor(
    @InjectRepository(QuizzEntity)
    private quizzRepository: Repository<QuizzEntity>,
  ) {}
  q;
  async create(quizzEntity: QuizzEntity) {
    try {
      const user = this.quizzRepository.create(quizzEntity);
      await this.quizzRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro na criação do quizz');
    }
  }

  async findByName(name: string): Promise<boolean> {
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
      throw new InternalServerErrorException('Erro na busca', error);
    }
  }
  async getQuizzById(id: number): Promise<QuizzEntity> {
    try {
      const foundOneQuizzById = await this.quizzRepository.findOne({
        where: {
          id,
        },
      });
      return foundOneQuizzById;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao encontrar o quizz número ${id}`,
      );
    }
  }
  async QuizzExists(id: number): Promise<boolean> {
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
      return await !!this.quizzRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Erro no servidor');
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
}
