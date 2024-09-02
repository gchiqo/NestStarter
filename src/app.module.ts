import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThingEntity } from './typeorm/thing.entity';
import { ThingModule } from './admin/thing/Thing.module';
import { ClassValidatorExtendModule } from './custom/validator/classvalidatorextend.module';

@Module({
  imports: [
    ConfigModule.forRoot(),//env is not working without it // npm install --save @nestjs/config   
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [
        ThingEntity
      ],
      synchronize: true,
    }),
    // modules
    ThingModule,

    ClassValidatorExtendModule,//custom validators
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
