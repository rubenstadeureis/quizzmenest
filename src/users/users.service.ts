import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hasEmail = await this.userRepository.hasEmail(createUserDto.email);
    if (hasEmail) {
      throw new BadRequestException('Email already exists');
    }
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async updateUserById(id: number, user: UpdateUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.userExists(id);
    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    if (user.email) {
      await this.verifyEmail(user.email, id);
    }
    return this.userRepository.updateUserById(id, user);
  }

  async verifyEmail(email: string, id: number): Promise<void> {
    const hasEmail = await this.userRepository.verifyEmail(email, id);
    if (hasEmail) {
      throw new BadRequestException('E-mail in use');
    }
  }

  async deleteUserById(id: number): Promise<boolean> {
    const userExists = await this.userRepository.userExists(id);
    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    return this.userRepository.deleteUserById(id);
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.getUserById(id);
  }
}
