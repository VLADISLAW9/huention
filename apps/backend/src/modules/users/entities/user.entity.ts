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

  @Column({ default: null })
  @ApiProperty({
    description: 'Пароль юзера',
    example: 1
  })
  password: string;

  @Column({ default: null })
  @ApiProperty({
    description: 'Никнейм юзера',
    example: 1
  })
  username: string;

  @Column({ default: null })
  @ApiProperty({
    description: 'Почта юзера',
    example: 1
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'Имя юзера',
    example: 1
  })
  firstName: string;

  @Column()
  @ApiProperty({
    description: 'Фамилия юзера',
    example: 1
  })
  lastName: string;

  @Column({ default: null })
  salt: string;
}
