import { IsObject } from 'class-validator';

export class UpdateQuestionDto {
  @IsObject()
  quizz?: [];
}
