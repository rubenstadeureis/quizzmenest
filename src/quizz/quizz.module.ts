import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzEntity } from './entities/quizz.entity';
import { QuizzController } from './quizz.controller';
import { QuizzRepository } from './quizz.repository';
import { QuizzService } from './quizz.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizzEntity])],
  controllers: [QuizzController],
  providers: [QuizzService, QuizzRepository],
  exports: [QuizzService],
})
export class QuizzModule {}
