import { Book } from '../../book/entities/book.entity';
import { Lecture } from '../../lecture/entities/lecture.entity';
import { Major } from '../../major/entities/major.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  student_id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne(() => Major)
  @JoinColumn({ name: "major", referencedColumnName: "major_id" })
  major: Major

  @OneToMany(() => Book, (book) => book.student)
  books: Book[]
  
  @ManyToMany(() => Lecture)
  @JoinTable()
  lectures: Lecture[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
