import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { Payment } from './payment.entity';
import { Attendance } from './attendance.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  profession: string;

  @Column()
  parentName: string;

  @Column()
  parentNumber: string;

  @Column()
  img: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  leftAt: Date | null;

  @ManyToOne(() => Group, (group) => group.students, { eager: true, onDelete: 'SET NULL' })
  group: Group;

  @OneToMany(() => Payment, payment => payment.student)
  payments: Payment[];

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];

  @Column({ default: false })
  hasPaid: boolean;
}