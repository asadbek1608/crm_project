import { Controller, Get, Delete, Param } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller()
export class BotMessageController {
  constructor(private readonly botService: BotService) {}

  @Get("get_all_messages")
  findAll() {
    return this.botService.findAll();
  }

  @Get("get_messages_from_today")
  findToday() {
    return this.botService.findFromToday();
  }

  @Get("get_messages_from_last_ten_day")
  findLastTenDays() {
    return this.botService.findFromLastTenDays();
  }

  @Delete("delete_message/:id")
  remove(@Param('id') id: string) {
    return this.botService.delete(id);
  }
}