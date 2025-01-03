import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ApiProperty({
    description: 'Уникальный идентификатор коллекции к которой принадлежит документ',
    example: 2
  })
  collectionId: number;
}
