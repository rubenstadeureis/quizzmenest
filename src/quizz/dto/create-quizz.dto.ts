import { IsString, IsNumber, IsObject } from 'class-validator';
import { Question } from 'src/question/entities/question.entity';
import { Column } from 'typeorm';

export class CreateQuizzDto {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  category: string;

  @Column()
  @IsNumber()
  quantityPlayed: number;

  @Column()
  @IsObject()
  quizz: { id: number; quizz: Question };
}
