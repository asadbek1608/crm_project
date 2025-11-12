import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bot } from './bot.schema';
import { Model } from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class BotService {
  private bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

  constructor(@InjectModel(Bot.name) private botModel: Model<Bot>) {
    this.handleMessages();
  }

  private handleMessages() {
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from?.first_name || 'Dost';
      this.bot.sendMessage(
        chatId,
        `Assalomu alaykum, ${name}! 👋\nBu CRM tizimining Telegram botidir.\nIltimos, xabaringizni yuboring.`,
      );
    });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from?.first_name || 'Anonim';
      const text = msg.text;

      if (!text || text === '/start') return;

      if (text.length < 5) {
        return this.bot.sendMessage(chatId, 'Iltimos, biroz uzunroq xabar yuboring');
      }

      await this.botModel.create({
        fullName: name,
        phoneNumber: 'unknown',
        message: text,
      });

      this.bot.sendMessage(chatId, '✅ Xabaringiz qabul qilindi!');
    });
  }

  async findAll() {
    return this.botModel.find();
  }

async findFromToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return this.botModel.find({createdAt: { $gte: today }});
}


async findFromLastTenDays() {
  const date = new Date();
  date.setDate(date.getDate() - 10);

  return this.botModel.find({createdAt: { $gte: date }});
}

async delete(id: string) {
  const msg = await this.botModel.findById(id);
  if (!msg) throw new NotFoundException('Message not found');

  await this.botModel.deleteOne({ _id: id });
  return { message: 'Deleted' };
}

}
