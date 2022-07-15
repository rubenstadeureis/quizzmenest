import { QuestionEntity } from 'src/question/entities/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('option_entity')
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.question)
  @JoinColumn({
    name: 'id',
  })
  question: QuestionEntity;
}
