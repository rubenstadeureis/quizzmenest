import { IsNumber, IsObject } from 'class-validator';

export class CreateQuestionDto {
  @IsNumber()
  id: number;

  @IsObject()
  question: [];
}
