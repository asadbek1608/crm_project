import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Group } from 'src/entities/group.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const teacher = await this.teacherRepo.findOne({ where: { id: createGroupDto.teacherId } });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const group = this.groupRepo.create({
      direction: createGroupDto.direction,
      days: createGroupDto.days,
      time: createGroupDto.time,
      teacher,
    });
    return this.groupRepo.save(group);
  }

async findAll(search = ''): Promise<Group[]> {
  const [groups] = await this.groupRepo.findAndCount({
    where: search
      ? [{ direction: Raw(alias => `${alias} ILIKE '%${search}%'`) }]
      : {},
    relations: ['teacher'],
  });
  return groups;
}

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['teacher'],
    });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async delete(id: number): Promise<{ message: string }> {
    const group = await this.groupRepo.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');

    await this.groupRepo.remove(group);
    return { message: 'Group deleted' };
  }
}