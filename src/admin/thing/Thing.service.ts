import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateThingDto } from './dto/CreateThing.dto';
import { In, Repository } from 'typeorm';
import { UpdateThingDto } from './dto/UpdateThing.dto';
import { ImageService } from 'src/custom/Image.service';
import { ThingEntity } from 'src/typeorm/thing.entity';

type ImageFile = {
  buffer: Buffer;
  originalname: string;
};


@Injectable()
export class ThingService {
  constructor(
    @InjectRepository(ThingEntity)
    private thingRepository: Repository<ThingEntity>,

    private readonly imageService: ImageService,
  ) { }

  async create(thingDto: CreateThingDto, image?: ImageFile): Promise<ThingEntity> {
    if (image) {
      const imgPath = await this.imageService.saveImage(image, 'thing');
      thingDto.img = imgPath;
    }
    
    const newThing = this.thingRepository.create(thingDto);
    const createdThing = await this.thingRepository.save(newThing);

    return this.getOne(createdThing.id)
  }

  async update(id: number, thingDto: UpdateThingDto, image?: ImageFile): Promise<ThingEntity> {
    const existingThing = await this.getOne(id);

    if (image) {
      if (existingThing.img) {
        await this.imageService.deleteImage(existingThing.img);
      }
      thingDto.img = await this.imageService.saveImage(image, 'thing');
    }

    await this.thingRepository.update(id, thingDto);

    return this.getOne(id);
  }

  async getOne(id: number, relation?: boolean): Promise<ThingEntity> {
    const relations = relation ? [] : []

    const thing = await this.thingRepository.findOne({ where: { id }, relations: relations });
    if (!thing) throw new NotFoundException(`Thing with ID ${id} not found`);
    return thing;
  }

  async getAll(query: any) {
    return this.thingRepository.find({
      where: {
        type: query.name ? query.name : undefined,
      },
      relations: []
    });
  }

  async delete(id: number): Promise<void> {
    const existingThing = await this.getOne(id);
    if (existingThing.img) {
      await this.imageService.deleteImage(existingThing.img);
    }

    await this.thingRepository.delete(id);
  }
}
