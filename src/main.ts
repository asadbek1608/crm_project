import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(cors());
  app.useGlobalPipes();

  await app.listen(4001);
  console.log(`Server is running at: http://localhost:4001`);
}
bootstrap();
