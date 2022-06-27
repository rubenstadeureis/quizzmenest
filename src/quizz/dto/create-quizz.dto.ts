import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreateQuizzDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  quantityPlayed: number;

  @IsObject()
  question: [];

  @IsObject()
  answer: [];
}
