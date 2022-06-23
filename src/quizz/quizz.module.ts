import { Module } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { QuizzRepository } from './quizz.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzEntity } from './entities/quizz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizzEntity])],
  controllers: [QuizzController],
  providers: [QuizzService, QuizzRepository],
})
export class QuizzModule {}
