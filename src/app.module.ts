import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigFactory } from './config/typeormConfig.factory';
import { UsersModule } from './users/users.module';
import { QuizzModule } from './quizz/quizz.module';
import { QuestionModule } from './question/question.module';
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfigFactory(),
    }),
    QuizzModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
