import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: "Student ID raqami", example: 1 })
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ description: "To'lov summasi", example: 100000 })
  @IsNumber()
  amount: number;
}