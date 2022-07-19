import { IsNumber, IsString } from 'class-validator';

export class CreateQuizzDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  quantityPlayed: number;
}
