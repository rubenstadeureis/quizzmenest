import { Module } from '@nestjs/common';
import { UsersService } from './quizz.service';
import { UsersController } from './quizz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzEntity } from './entities/quizz.entity';
import { QuizzRepository } from './quizz.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuizzEntity])],
  controllers: [UsersController],
  providers: [UsersService, QuizzRepository],
})
export class UsersModule {}
