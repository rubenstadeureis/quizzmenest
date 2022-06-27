import { IsObject } from 'class-validator';

export class CreateQuestionDto {
  @IsObject()
  quizz: [];

  @IsObject()
  answer: [];
}
