import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/question/question.module';
import { OptionEntity } from './entities/option.entity';
import { OptionRepository } from './option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity]), QuestionModule],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
  exports: [OptionService],
})
export class OptionModule {}
