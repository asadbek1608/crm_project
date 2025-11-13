import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Student } from '../entities/student.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    student.hasPaid = true; // to'lov qilganini belgilaymiz
    await this.studentRepo.save(student);

    const payment = this.paymentRepo.create({
      student,
      amount: dto.amount,
      date: new Date().toISOString().split('T')[0],
    });

    return this.paymentRepo.save(payment);
  }

  async getStudentPayments(studentId: number): Promise<Payment[]> {
    return this.paymentRepo.find({
      where: { student: { id: studentId } },
      relations: ['student'],
    });
  }
}