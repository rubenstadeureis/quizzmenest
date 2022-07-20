import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: number, pass: string): Promise<any> {
    const user = await this.usersService.getUserById(id);
    if (user && bcrypt.compareSync(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: UserEntity) {
    console.log(user);

    const payload = { email: user.id, senha: user.password };
    if (!payload) {
      throw new BadRequestException('Usuário Inexistente');
    }
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
