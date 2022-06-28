import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  question: string;

  @IsNumber()
  quizzId: number;

  @ValidateNested({ always: true, each: true })
  @Type(() => OptionDto)
  options?: OptionDto[];
}

class OptionDto {
  @IsString()
  option: string;

  @IsBoolean()
  isCorrect: boolean;
}
