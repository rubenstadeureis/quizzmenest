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

  async getUserbyId(id: number): Promise<UserEntity> {
<<<<<<< HEAD
    const UserNotFound = await this.userRepository.getUserById(id);
    if (!UserNotFound) {
      throw new BadRequestException('Usuárior não existe!');
=======
    const userById = await this.userRepository.getUserById(id);
    if (!userById) {
      throw new BadRequestException('User not exist!');
>>>>>>> 8dbaf9b9e7e8ff159a5b7339d451097fe24a447f
    }
    return userById;
  }
  // TO-DO: Refact using TypeOrm.
  async listUsers() {
    return this.userRepository.listUsers();
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
<<<<<<< HEAD
    const user = this.userRepository.deleteUserById(id);
    if (!user) {
      throw new BadRequestException('Usuário não existe!');
    }
    return user;
=======
    const userDeleteById = this.userRepository.deleteUserById(id);
    if (!userDeleteById) {
      throw new BadRequestException('User not exist!');
    }
    return userDeleteById;
>>>>>>> 8dbaf9b9e7e8ff159a5b7339d451097fe24a447f
  }

  async updateUserById(id: number, update: UpdateUserDto): Promise<UserEntity> {
    const findUser = await this.userRepository.getUserById(id);
    if (!findUser) {
      throw new BadRequestException('Usuário não existe!');
    }
    return await this.userRepository.updateUserById(update, id);
  }
}
