import { IsOptional, IsString } from 'class-validator';

export class UpdateQuizzDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsOptional()
  quantityPlayed?: number;
}
