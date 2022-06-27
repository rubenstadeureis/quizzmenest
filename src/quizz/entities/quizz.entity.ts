import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuizzEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  category: string;

  @Column()
  quantityPlayed: number;

  @OneToMany(() => Question, (question) => question.quizz)
  question: Question[];

  @OneToMany(() => Question, (question) => question.answer)
  answer: Question[];
}
