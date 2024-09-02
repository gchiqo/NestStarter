import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ThingService } from './Thing.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateThingDto } from './dto/CreateThing.dto';
import { UpdateThingDto } from './dto/UpdateThing.dto';

@Controller('thing')
export class ThingController {
  constructor(private thingService: ThingService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() ThingDto: CreateThingDto,
    @UploadedFile() image: { buffer: Buffer; originalname: string },
  ) {
    return await this.thingService.create(ThingDto, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() ThingDto: UpdateThingDto,
    @UploadedFile() image: { buffer: Buffer; originalname: string },
  ) {
    return await this.thingService.update(id, ThingDto, image);
  }

  @Get()
  async getAll(@Query() query: any) {
    return await this.thingService.getAll(query);
  }

  @Get(':id')
  async getById(@Param('id') id: number, @Query('relation') relation?: boolean) {
    return await this.thingService.getOne(id, relation);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.thingService.delete(id);
  }

}
