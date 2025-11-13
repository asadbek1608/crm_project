import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direction: string;

  @Column()
  days: string;

  @Column()
  time: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups, { eager: true, onDelete: 'CASCADE' })
  teacher: Teacher;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}