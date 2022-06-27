import { IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  questUser: string;

  @IsString()
  answerUser: string;

  quizz: [];
}
