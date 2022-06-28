import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  question: string;

  @IsNumber()
  quizzId: number;
}
