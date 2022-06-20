import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
  ) {}
  private users: UserEntity[] = [];

  create(createUserDto: CreateUserDto) {
    try {
      const currentId = this.users[this.users.length - 1]?.id || 0;

      const id = currentId + 1;

      const user = {
        id,
        ...createUserDto,
      };
      this.users.push(user);

      return user;
    } catch (error) {
      console.log('erro na criação de usuário', error);
    }
  }

  findAll() {
    try {
      return this.users;
    } catch (error) {
      console.log('erro na lista de usuários', error);
    }
  }

  findOne(id: number) {
    try {
      const IdUsuario = this.users.findIndex((user) => user.id === id);
      return this.users[IdUsuario];
    } catch (error) {
      console.log('error inesperado ao buscar um usuário', error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const oldUser = this.findOne(id);

      const newUser = {
        ...oldUser,
        ...updateUserDto,
      };
      const IdUsuario = this.users.findIndex((user) => user.id === id);
      this.users[IdUsuario] = newUser;

      return newUser;
    } catch (error) {
      console.log('erro ao fazer o update', error);
    }
  }

  remove(id: number) {
    try {
      const IdUsuario = this.users.findIndex((user) => user.id === id);

      this.users.splice(IdUsuario, 1);
    } catch (error) {
      console.log('erro ao deleter usuário', error);
    }
  }
}
