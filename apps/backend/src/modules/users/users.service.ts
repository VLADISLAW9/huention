import type { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';

import { BaseService } from '@/shared';

import { User } from './entities';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>
  ) {
    super(UsersRepository);
  }

  getUserByToken(token: string) {
    const decodedJwtAccessToken = jwt.decode(token) as { user: User };
    return this.findOne({ where: { id: decodedJwtAccessToken.user.id } });
  }
}
