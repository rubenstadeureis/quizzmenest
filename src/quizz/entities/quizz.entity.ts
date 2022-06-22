import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuizzEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  category: string;

  @Column()
  quantityPlayed: number;
}
