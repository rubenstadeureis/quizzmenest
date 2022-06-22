import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log('Erro ao listar usuários', error);
      throw new InternalServerErrorException('Erro ao listar usuários');
    }
  }

  async updateUserById(id: number, user: UpdateUserDto): Promise<UserEntity> {
    try {
      const userFounded = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      return await this.userRepository.save({
        ...userFounded,
        ...user,
      });
    } catch (error) {
      console.log('Erro ao atualizar usuário', error);
      throw new InternalServerErrorException('Erro ao atualizar usuário');
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

  async verifyEmail(email: string, id: number): Promise<boolean> {
    try {
      const userFounded = await this.userRepository.count({
        where: {
          email,
          id: Not(id),
        },
      });
      return userFounded > 0;
    } catch (error) {
      console.log('Erro ao verificar disponibilidade do e-mail', error);
      throw new InternalServerErrorException(
        'Erro ao verificar disponibilidade do e-mail',
      );
    }
  }

  async deleteUserById(id: number): Promise<boolean> {
    try {
      return !!(await this.userRepository.delete(id));
    } catch (error) {
      console.log('Erro ao deletar usuário', error);
      throw new InternalServerErrorException('Erro ao deletar usuário');
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('Erro ao buscar usuário pelo id', error);
      throw new InternalServerErrorException('Erro ao buscar usuário pelo id');
    }
  }
}
