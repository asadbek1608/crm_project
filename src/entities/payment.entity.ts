import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Student } from '../entities/student.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, student => student.payments)
  student: Student;

  @Column()
  amount: number;

  @Column({ type: 'date' })
  date: string;
}