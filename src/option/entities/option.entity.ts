import { QuestionEntity } from 'src/question/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  question: QuestionEntity;
}
