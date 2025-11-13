import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({ description: "Student ID raqami", example: 1 })
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ description: "To'lov qilgan sanasi", example: '2025-11-13' })
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  present: boolean;
}