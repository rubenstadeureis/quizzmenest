import { IsString, IsNumber } from 'class-validator';

export class CreateQuizzDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  quantityPlayed: number;
}
