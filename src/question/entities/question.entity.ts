import { OptionEntity } from 'src/option/entities/option.entity';
import { QuizzEntity } from 'src/quizz/entities/quizz.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  question: string;

  @ManyToOne(() => QuizzEntity, (quizz) => quizz.questions)
  quizz: QuizzEntity;

  @OneToMany(() => OptionEntity, (option) => option.question, {
    eager: true,
    cascade: true,
  })
  options: OptionEntity[];
}
