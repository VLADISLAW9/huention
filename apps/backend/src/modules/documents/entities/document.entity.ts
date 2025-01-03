import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Collection } from '@/modules/collections/entities';

@Entity('document')
export class Document {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Уникальный идентификатор документа',
    example: 1
  })
  id: number;

  @Column({ default: null })
  @ApiProperty({
    description: 'Имя коллекции',
    example: 'Личное'
  })
  name: string;

  @Column({ default: null })
  @ApiProperty({
    description: 'Описание коллекции',
    example: 'Описание'
  })
  description: string;

  @Column({ default: null })
  @ApiProperty({
    description: 'Тело документа',
    example: 'Какой то текст с какой то информацией'
  })
  body: string;

  @Column({ default: null })
  @ApiProperty({
    description: 'Id создателя документа',
    example: 1
  })
  creatorId: number;

  @ManyToOne(() => Collection, (collection) => collection.documents)
  @JoinColumn({ name: 'collectionId', referencedColumnName: 'id' })
  collection: Collection;
}
