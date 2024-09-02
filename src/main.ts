import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import * as dotenv from 'dotenv'
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { ExeptionHendaler } from './custom/ExeptionHendaler';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config()//env is not working without it  npm install --save @nestjs/config   

  app.enableCors();//send requests from enywhere

  useContainer(app.select(AppModule), { fallbackOnErrors: true });//return errors
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))//return errors

  app.useGlobalFilters(new ExeptionHendaler());//custom exeption hendaler

  await app.listen(env.APP_PORT);
}
bootstrap();
