import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPatmentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPatmentDto);
  }

  @Get('student/:id')
  getStudentPayments(@Param('id') id: string) {
    return this.paymentsService.getStudentPayments(+id);
  }
}