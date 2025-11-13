import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('add_group')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get("get_all_groups")
  findAll(@Query('search') search?: string,) {
    return this.groupService.findAll( search || '');
  }

  @Get("get_one_group/:id")
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Delete("delete_group/:id")
  remove(@Param('id') id: string) {
    return this.groupService.delete(+id);
  }
}