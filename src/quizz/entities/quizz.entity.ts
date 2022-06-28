import { QuestionEntity } from 'src/question/entities/question.entity';
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

  @OneToMany(() => QuestionEntity, (question) => question.quizz, {
    eager: true,
    cascade: true,
  })
  questions: QuestionEntity[];
}
