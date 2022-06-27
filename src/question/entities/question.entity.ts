import { QuizzEntity } from 'src/quizz/entities/quizz.entity';
import { ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => QuizzEntity, (quizz) => quizz.question, { eager: true })
  quizz: QuizzEntity;

  @ManyToOne(() => QuizzEntity, (quizz) => quizz.answer, { eager: true })
  answer: QuizzEntity;
}
