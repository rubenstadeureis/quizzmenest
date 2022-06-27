import { QuizzEntity } from 'src/quizz/entities/quizz.entity';
import { OneToMany, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  questUser: string;

  @Column()
  answerUser: string;

  @OneToMany(() => QuizzEntity, (question) => question.quizz)
  question: QuizzEntity[];
}
