import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateQuizzDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  quantityPlayed: number;


  @ValidateNested({ always: true, each: true })
  @Type(() => QuestionsDto)
  questions?: QuestionsDto[];
}

class QuestionsDto {
  @IsString()
  question: string;

}
