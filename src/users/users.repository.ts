import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log('Erro na criação do usuário', error);
      throw new InternalServerErrorException('Erro na criação do usuário');
    }
  }

  async hasEmail(email: string): Promise<boolean> {
    try {
      const count = await this.userRepository.count({
        where: {
          email,
        },
      });
      return count > 0;
    } catch (error) {
      console.log('Erro ao verificar usuário por e-mail', error);
      throw new InternalServerErrorException(
        'Erro ao verificar usuário por e-mail',
      );
    }
  }

  async listUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Erro na busca', error);
    }
  }
  async getUserById(id: number): Promise<UserEntity> {
    try {
      const foundOneUserById = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      return foundOneUserById;
    } catch (error) {
      console.log(`Erro ao encontrar o usuário ${id}`, error);
      throw new InternalServerErrorException(
        `Erro ao encontrar o usuário ${id}`,
      );
    }
  }
  async userExists(id: number): Promise<boolean> {
    try {
      const userFounded = await this.userRepository.count({
        where: {
          id,
        },
      });
      return userFounded > 0;
    } catch (error) {
      console.log('Erro ao verificar usuário', error);
      throw new InternalServerErrorException('Erro ao verificar usuário');
    }
  }
  async deleteUserById(id: number): Promise<boolean> {
    try {
      return !!(await this.userRepository.delete(id));
    } catch (error) {
      console.log('Erro ao achar o usuário e deletar', error);
      throw new InternalServerErrorException('Erro no servidor');
    }
  }
  async updateUserById(update: UpdateUserDto, id: number) {
    try {
      const foundedOneUserById = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      return await this.userRepository.save({
        ...foundedOneUserById,
        ...update,
      });
    } catch (error) {
      console.log('Erro ao encontrar o usuário', error);
      throw new InternalServerErrorException('Erro ao excluir usuário!');
    }
  }
}
