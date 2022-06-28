import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  option: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  questionId: number;
}
