import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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
}
