import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { Repository, Raw } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Group } from 'src/entities/group.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Group) private groupRepo: Repository<Group>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { fullName, phoneNumber, profession, parentName, parentNumber, img, groupId } = createStudentDto;

    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    if (!group) throw new NotFoundException('Group not found');

    const student = this.studentRepo.create({
      fullName,
      phoneNumber,
      profession,
      parentName,
      parentNumber,
      img,
      group
    });

    return this.studentRepo.save(student);
  }

    async findAll(page = 1, limit = 10, search = '') {
    const [students, total] = await this.studentRepo.findAndCount({
      where: search
        ? [
            { fullName: Raw(alias => `${alias} ILIKE '%${search}%'`) },
            { phoneNumber: Raw(alias => `${alias} ILIKE '%${search}%'`) },
            { profession: Raw(alias => `${alias} ILIKE '%${search}%'`) },
            { parentName: Raw(alias => `${alias} ILIKE '%${search}%'`) },
          ]
        : {},
      take: limit,
      skip: (page - 1) * limit,
      order: { id: 'ASC' },
    });

    return {
      totalPage: Math.ceil(total / limit),
      prev: page > 1 ? { page: page - 1, limit } : undefined,
      next: total > page * limit ? { page: page + 1, limit } : undefined,
      students,
    };
  }

    async getStatistics() {
    const result = await this.studentRepo.query(`SELECT DATE_TRUNC('month', "joinedAt") AS month,
        COUNT(id) AS "totalJoined", SUM(CASE WHEN "leftAt" IS NOT NULL THEN 1 ELSE 0 END) AS "leftCount" 
        FROM student 
        GROUP BY DATE_TRUNC('month', "joinedAt")
        ORDER BY month ASC;
    `);

    return result;
  }

    async leftStudent(id: number): Promise<{ message: string }> {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');

    student.leftAt = new Date();
    await this.studentRepo.save(student);

    return { message: 'Updated student' };
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<{ message: string }> {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');

    await this.studentRepo.update(id, updateStudentDto);
    return { message: 'Updated' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');

    await this.studentRepo.remove(student);
    return { message: 'Deleted' };
  }
}