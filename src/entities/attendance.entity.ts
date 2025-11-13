import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Student } from '../entities/student.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, student => student.attendances)
  student: Student;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: false })
  present: boolean;
}
