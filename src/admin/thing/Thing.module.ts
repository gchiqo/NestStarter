import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThingController } from './Thing.controller';
import { ThingService } from './Thing.service';
import { ImageService } from 'src/custom/Image.service';
import { ThingEntity } from 'src/typeorm/thing.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ThingEntity])],
  controllers: [ThingController],
  providers: [ThingService, ImageService],
})
export class ThingModule { }
