import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { Teacher } from '../entities/teacher.entity';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Teacher])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}