import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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

  // TO-DO: Refact using TypeOrm.
  // findAll() {
  //   try {
  //     return this.users;
  //   } catch (error) {
  //     console.log('erro na lista de usuários', error);
  //   }
  // }

  // findOne(id: number) {
  //   try {
  //     const IdUsuario = this.users.findIndex((user) => user.id === id);
  //     return this.users[IdUsuario];
  //   } catch (error) {
  //     console.log('error inesperado ao buscar um usuário', error);
  //   }
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   try {
  //     const oldUser = this.findOne(id);

  //     const newUser = {
  //       ...oldUser,
  //       ...updateUserDto,
  //     };
  //     const IdUsuario = this.users.findIndex((user) => user.id === id);
  //     this.users[IdUsuario] = newUser;

  //     return newUser;
  //   } catch (error) {
  //     console.log('erro ao fazer o update', error);
  //   }
  // }

  // remove(id: number) {
  //   try {
  //     const IdUsuario = this.users.findIndex((user) => user.id === id);

  //     this.users.splice(IdUsuario, 1);
  //   } catch (error) {
  //     console.log('erro ao deleter usuário', error);
  //   }
  // }
}
