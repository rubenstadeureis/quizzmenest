import { QuizzEntity } from 'src/quizz/entities/quizz.entity';
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  question: string;

  @ManyToOne(() => QuizzEntity, (quizz) => quizz.questions)
  quizz: QuizzEntity;
}
