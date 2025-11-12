import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "./student/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./validation/validation.pipe";
import { BotModule } from './bot/bot.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      password: "1628",
      database: "crm_project",
      host: "localhost",
      port: 5432,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    StudentModule,
    BotModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}