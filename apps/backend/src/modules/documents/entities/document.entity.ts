import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Document, (document) => document.childrenDocuments, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'parentDocumentId' })
  parentDocument: Document;

  @Column({ default: null })
  parentDocumentId: number | null;

  @OneToMany(() => Document, (document) => document.parentDocument)
  childrenDocuments: Document[];
}
