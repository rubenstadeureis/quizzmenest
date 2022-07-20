import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8);
  }
  @BeforeUpdate()
  async beforeUpdate(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
