import { IsEnum, IsOptional, IsString, IsNumber, IsDecimal, IsNotEmpty, MaxLength } from 'class-validator';
import { EntityUnique } from 'src/custom/validator/EntityUniqueValidator';
import { ThingEntity } from 'src/typeorm/thing.entity';

enum typeEnum {
  popup = "popup",
  blog = "blog",
  faq = "faq"
}

export class CreateThingDto {
  @IsEnum(typeEnum)
  @IsNotEmpty()
  @MaxLength(255)
  type: typeEnum;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @EntityUnique([ThingEntity, 'title', 'id'])
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1023)
  text: string;

  @IsOptional()
  sort: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  img?: string;
}
