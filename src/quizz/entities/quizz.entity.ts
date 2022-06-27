import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Question, (quizz) => quizz.question, { eager: true })
  quizz: QuizzEntity;
}
