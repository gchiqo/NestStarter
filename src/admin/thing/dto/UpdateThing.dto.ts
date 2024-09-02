import { PartialType } from '@nestjs/mapped-types';//npm i @nestjs/mapped-types
import { CreateThingDto } from './CreateThing.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateThingDto extends PartialType(CreateThingDto) {
    @IsNotEmpty()
    id: number;
}
