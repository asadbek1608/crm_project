import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher)private readonly teacherRepo: Repository<Teacher>) {}

   async create(createTeacherDto: CreateTeacherDto): Promise<Teacher>  {
    const { fullName, phoneNumber, img, profession } = createTeacherDto;
    const teacher = this.teacherRepo.create({ fullName, phoneNumber, img, profession });
    return this.teacherRepo.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepo.find();
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepo.findOneBy({ id });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<{ message: string }> {
    const teacher = await this.teacherRepo.findOneBy({ id });
    if (!teacher) throw new NotFoundException('Teacher not found');

    await this.teacherRepo.update(id, updateTeacherDto)
    return {message: "Updated"}
  }

  async remove(id: number): Promise<{ message: string }> {
    const teacher = await this.findOne(id);
    await this.teacherRepo.remove(teacher);
    return { message: 'Teacher deleted' };
  }
}