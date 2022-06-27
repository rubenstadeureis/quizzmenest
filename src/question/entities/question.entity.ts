import { QuizzEntity } from 'src/quizz/entities/quizz.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizzEntity, (id) => id.id)
  question: QuizzEntity[];
}
