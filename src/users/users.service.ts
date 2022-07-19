import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (hasEmail) {
      throw new BadRequestException('Email already exists');
    }
    return this.userRepository.create(createUserDto);
  }

  async getUserbyId(id: number): Promise<UserEntity> {
    const userById = await this.userRepository.getUserById(id);
    if (!userById) {
      throw new BadRequestException('User not exist!');
    }
    return userById;
  }
  // TO-DO: Refact using TypeOrm.
  async listUsers() {
    return this.userRepository.listUsers();
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    const userDeleteById = this.userRepository.deleteUserById(id);
    if (!userDeleteById) {
      throw new BadRequestException('User not exist!');
    }
    return userDeleteById;
  }

  async updateUserById(id: number, update: UpdateUserDto): Promise<UserEntity> {
    const findUser = await this.userRepository.getUserById(id);
    if (!findUser) {
      throw new BadRequestException('User not exist!');
    }
    return await this.userRepository.updateUserById(update, id);
  }
}
