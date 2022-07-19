import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  question: string;

  @IsNumber()
  quizzId: number;

  @ValidateNested({ always: true, each: true })
  @Type(() => OptionDto)
  option?: OptionDto[];
}

class OptionDto {
  @IsString()
  option: string;
}
