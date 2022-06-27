import { IsNumber, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsNumber()
  id: number;

  @IsString()
  question: string;
}
