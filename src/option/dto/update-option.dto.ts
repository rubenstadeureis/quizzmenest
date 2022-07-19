import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOptionDto {
  @IsOptional()
  @IsString()
  option?: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;

  @IsOptional()
  @IsNumber()
  questionId?: number;
}
