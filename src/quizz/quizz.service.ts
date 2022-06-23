import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { QuizzEntity } from './entities/quizz.entity';
import { QuizzRepository } from './quizz.repository';

@Injectable()
export class QuizzService {
  constructor(private quizzRepository: QuizzRepository) {}

  async create(createUserDto: CreateQuizzDto): Promise<any> {
    const hasName = await this.quizzRepository.hasName(createUserDto.name);
    if (hasName) {
      throw new BadRequestException('Name already exists');
    }
    return this.quizzRepository.create(createUserDto);
  }

  async getQuizzbyId(id: number): Promise<QuizzEntity> {
    const UserNotFound = await this.quizzRepository.getQuizzById(id);
    if (!UserNotFound) {
      throw new BadRequestException('User not exist!');
    }
    return UserNotFound;
  }
  // TO-DO: Refact using TypeOrm.
  async listQuizz() {
    return this.quizzRepository.listQuizz();
  }

  async deleteQuizzById(id: number): Promise<boolean> {
    const UserNotFound = this.quizzRepository.deleteQuizzById(id);
    if (!UserNotFound) {
      throw new BadRequestException('User not exist!');
    }
    return UserNotFound;
  }

  async updateQuizzById(
    id: number,
    update: UpdateQuizzDto,
  ): Promise<QuizzEntity> {
    const findUser = await this.quizzRepository.QuizzExists(id);
    if (!findUser) {
      throw new BadRequestException('User not exist!');
    }
    return await this.quizzRepository.updateQuizzById(update, id);
  }
}
