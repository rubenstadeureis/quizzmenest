import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigFactory } from './config/typeormConfig.factory';
import { UsersModule } from './quizz/quizz.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfigFactory(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
