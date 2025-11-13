import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "./student/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./validation/validation.pipe";
import { BotModule } from './bot/bot.module';
import { MongooseModule } from "@nestjs/mongoose";
import { TeacherModule } from './teacher/teacher.module';
import { GroupModule } from './group/group.module';
import { PaymentModule } from './payment/payment.module';
import { AttendanceModule } from './attendance/attendance.module';

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
    TeacherModule,
    GroupModule,
    PaymentModule,
    AttendanceModule,
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