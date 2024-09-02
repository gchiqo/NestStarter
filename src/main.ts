import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import * as dotenv from 'dotenv'
import { useContainer } from 'class-validator';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config()//env is not working without it  npm install --save @nestjs/config   

  app.enableCors();//send requests from enywhere

  await app.listen(env.APP_PORT);
}
bootstrap();
