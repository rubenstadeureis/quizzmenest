import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { QuizzEntity } from './entities/quizz.entity';

@Injectable()
export class QuizzRepository {
  constructor(
    @InjectRepository(QuizzEntity)
    private QuizzRepository: Repository<QuizzEntity>,
  ) {}

  async create(QuizzEntity: QuizzEntity) {
    try {
      const user = this.QuizzRepository.create(QuizzEntity);
      await this.QuizzRepository.save(user);
      return user;
    } catch (error) {
      console.log('Erro na criação do quizz', error);
      throw new InternalServerErrorException('Erro na criação do quizz');
    }
  }

  async hasName(name: string): Promise<boolean> {
    try {
      const countById = await this.QuizzRepository.count({
        where: {
          name,
        },
      });
      return countById > 0;
    } catch (error) {
      console.log('Erro ao verificar o quizz pelo nome', error);
      throw new InternalServerErrorException(
        'Erro ao verificar quizz pelo nome',
      );
    }
  }

  async listQuizz(): Promise<QuizzEntity[]> {
    try {
      return await this.QuizzRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Erro na busca', error);
    }
  }
  async getQuizzById(id: number): Promise<QuizzEntity> {
    try {
      const foundOneQuizzById = await this.QuizzRepository.findOne({
        where: {
          id,
        },
      });
      return foundOneQuizzById;
    } catch (error) {
      console.log(`Erro ao encontrar o quizz número ${id}`, error);
      throw new InternalServerErrorException(
        `Erro ao encontrar o quizz número ${id}`,
      );
    }
  }
  async QuizzExists(id: number): Promise<boolean> {
    try {
      const quizzFoundedByQuizz = await this.QuizzRepository.count({
        where: {
          id,
        },
      });
      return quizzFoundedByQuizz > 0;
    } catch (error) {
      console.log('Erro ao verificar o Id do quizz', error);
      throw new InternalServerErrorException('Erro ao verificar o Id do quizz');
    }
  }
  async deleteQuizzById(id: number): Promise<boolean> {
    try {
      return await !!this.QuizzRepository.delete(id);
    } catch (error) {
      console.log('Erro ao deletar o quizz', error);
      throw new InternalServerErrorException('Erro no servidor');
    }
  }
  async updateQuizzById(updateQuizz: UpdateQuizzDto, id: number) {
    try {
      const foundedOneQuizzById = await this.QuizzRepository.findOne({
        where: {
          id,
        },
      });
      return await this.QuizzRepository.save({
        ...foundedOneQuizzById,
        ...updateQuizz,
      });
    } catch (error) {
      console.log('Erro ao atualizar o quizz', error);
      throw new InternalServerErrorException('Erro ao atualizar o quizz');
    }
  }
}
