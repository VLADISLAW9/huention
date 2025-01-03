import { Body, Controller, Get, NotFoundException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ApiAuthorizedOnly, BaseResolver } from '@/shared';

import { UsersService } from '../users';
import { GetCollectionsResponse, PostCollectionResponse } from './collection.model';
import { CollectionsService } from './collections.service';
import { PostCollectionDto } from './dto';
import { Collection } from './entities';

@Controller('collections')
export class CollectionsController extends BaseResolver {
  constructor(
    readonly collectionsService: CollectionsService,
    readonly usersService: UsersService
  ) {
    super();
  }

  @Get()
  @ApiAuthorizedOnly()
  @ApiOperation({ summary: 'Получить коллекции пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Коллекции пользователя',
    type: GetCollectionsResponse
  })
  @ApiBearerAuth()
  async getCollections(@Req() request: Request): Promise<GetCollectionsResponse> {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    const token = request.headers.authorization.split(' ')[1];

    const user = await this.usersService.getUserByToken(token);

    const collections = await this.collectionsService.getCollections();

    if (!collections) {
      throw new NotFoundException('Коллекции не найдены');
    }

    const userCollections = collections.filter((collection) => collection.creatorId === user.id);

    return this.wrapSuccess({ collections: userCollections });
  }

  @Post()
  @ApiAuthorizedOnly()
  @ApiOperation({ summary: 'Создать коллекцию' })
  @ApiResponse({
    status: 200,
    description: 'Коллекции пользователя',
    type: PostCollectionResponse
  })
  @ApiBearerAuth()
  async createCollection(
    @Req() request: Request,
    @Body() body: PostCollectionDto
  ): Promise<PostCollectionResponse> {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    const token = request.headers.authorization.split(' ')[1];

    const user = await this.usersService.getUserByToken(token);

    const _collection = new Collection();

    _collection.creatorId = user.id;
    _collection.name = body.name;
    _collection.description = body.description;

    const collection = await this.collectionsService.save(_collection);

    return this.wrapSuccess({ collection });
  }
}
