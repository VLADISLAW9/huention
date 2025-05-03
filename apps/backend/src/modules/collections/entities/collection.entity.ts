import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Document } from '@/modules/documents/entities';

@Entity('collection')
export class Collection {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Уникальный идентификатор коллекции',
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

  @ManyToOne(() => Collection, (collection) => collection.documents)
  @JoinColumn({ name: 'parentCollectionId', referencedColumnName: 'id' })
  parentCollection: Collection;

  @OneToMany(() => Collection, (collection: Collection) => collection.parentCollection)
  @ApiProperty({
    description: 'Дочерние коллекции'
  })
  childCollections: Collection[];

  @Column({ default: null })
  @ApiProperty({
    description: 'Id создателя коллекции',
    example: 1
  })
  creatorId: number;

  @OneToMany(() => Document, (document: Document) => document.collection)
  @ApiProperty({
    description: 'Документы коллекции',
    example: [
      { id: 1, name: 'Документ 1' },
      { id: 2, name: 'Документ 2' }
    ]
  })
  documents: Document[];
}
