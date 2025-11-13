import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotService } from './bot.service';
import { Bot, BotSchema } from './bot.schema';
import { BotMessageController } from './bot.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }])],
  controllers: [BotMessageController],
  providers: [BotService],
})
export class BotModule {}