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
    const UserNotFound = await this.userRepository.getUserById(id);
    if (!UserNotFound) {
      throw new BadRequestException('User not exist!');
    }
    return UserNotFound;
  }
  // TO-DO: Refact using TypeOrm.
  async listUsers() {
    return this.userRepository.listUsers();
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    const UserNotFound = this.userRepository.deleteUserById(id);
    if (!UserNotFound) {
      throw new BadRequestException('User not exist!');
    }
    return UserNotFound;
  }

  async updateUserById(id: number, update: UpdateUserDto): Promise<UserEntity> {
    const findUser = await this.userRepository.userExists(id);
    if (!findUser) {
      throw new BadRequestException('User not exist!');
    }
    return await this.userRepository.updateUserById(update, id);
  }
}
