import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Student } from '../entities/student.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance) private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateAttendanceDto): Promise<Attendance> {
    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const attendance = this.attendanceRepo.create({
      student,
      date: dto.date,
      present: dto.present
    });

    return this.attendanceRepo.save(attendance);
  }

  async getStudentAttendance(studentId: number): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: { student: { id: studentId } },
      relations: ['student'],
    });
  }
}