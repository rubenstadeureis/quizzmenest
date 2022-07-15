import { OptionEntity } from 'src/option/entities/option.entity';
import { QuizzEntity } from 'src/quizz/entities/quizz.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('question_entity')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => QuizzEntity, (quizz) => quizz.questions)
  quizz: QuizzEntity;

  @OneToMany(() => OptionEntity, (option) => option.option, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  option: OptionEntity[];
}
