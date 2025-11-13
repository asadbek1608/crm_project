import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Guruh yo'nalishi", example: "Backend" })
  direction: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Dars kunlari", example: "DU-CHOR-JUMA" })
  days: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Dars vaqti", example: "14:00-16:00" })
  time: string;

  @ApiProperty({ description: "O'qituvchi ID raqami", example: 1 })
  teacherId: number;
}