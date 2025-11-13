import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post("add_student")
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get("get_all_students")
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.studentService.findAll(Number(page) || 1, Number(limit) || 10, search || '');
  }

  @Get("get_statistics")
  getStatistics() {
    return this.studentService.getStatistics();
  }

  @Patch("left_student/:id")
  leftStudent(@Param('id') id: string) {
    return this.studentService.leftStudent(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}