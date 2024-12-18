import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Уникальный идентификатор юзера',
    example: 1
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Уникальный идентификатор юзера',
    example: 1
  })
  firstName: string;

  @Column()
  @ApiProperty({
    description: 'Уникальный идентификатор юзера',
    example: 1
  })
  lastName: string;
}
