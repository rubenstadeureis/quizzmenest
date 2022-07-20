import { BadRequestException, Injectable } from '@nestjs/common';
import { validarEmail } from 'src/global-validation/email';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const hasEmail = await this.userRepository.hasEmail(createUserDto.email);
    if (hasEmail) throw new BadRequestException('Email já existe');

    if (!validarEmail(createUserDto.email))
      throw new BadRequestException('Email inválido');
    return this.userRepository.create(createUserDto);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const UserNotFound = await this.userRepository.getUserById(id);
    if (!UserNotFound) {
      throw new BadRequestException('Usuárior não existe!');
    }
    return UserNotFound;
  }
  // TO-DO: Refact using TypeOrm.
  async listUsers() {
    return this.userRepository.listUsers();
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    const user = this.userRepository.deleteUserById(id);
    if (!user) {
      throw new BadRequestException('Usuário não existe!');
    }
    return user;
  }

  async updateUserById(id: number, update: UpdateUserDto): Promise<UserEntity> {
    const findUser = await this.userRepository.getUserById(id);
    if (!findUser) {
      throw new BadRequestException('Usuário não existe!');
    }
    return await this.userRepository.updateUserById(update, id);
  }
}
