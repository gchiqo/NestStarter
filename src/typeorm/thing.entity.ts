import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
//npm install --save @nestjs/typeorm typeorm mysql2

@Entity('thing')
export class ThingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: [ "faq","blog", "popup"] })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 1023, nullable: true })
  text: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  img: string;

  @Column({ type: 'decimal', precision: 15, scale: 10, nullable: true })
  sort: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
