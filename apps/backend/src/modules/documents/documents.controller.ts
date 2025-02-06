import { Body, Controller, Get, NotFoundException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly, BaseResolver } from '@/shared';

import { UsersService } from '../users';
import { GetDocumentsResponse, PostDocumentResponse } from './documents.model';
import { DocumentsService } from './documents.service';
import { PostDocumentDto } from './dto';

@Controller('documents')
@ApiAuthorizedOnly()
export class DocumentsController extends BaseResolver {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly usersService: UsersService
  ) {
    super();
  }
  @Get()
  @ApiOperation({ summary: 'Получить коллекции пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Коллекции пользователя',
    type: GetDocumentsResponse
  })
  @ApiBearerAuth()
  async getDocuments(@Req() request: Request): Promise<GetDocumentsResponse> {
    const token = request.cookies.access_token;

    const user = await this.usersService.getUserByToken(token);

    const documents = await this.documentsService.getDocuments();

    if (!documents) {
      throw new NotFoundException('Документы не найдены');
    }

    const userDocuments = documents.filter((document) => document.creatorId === user.id);

    return this.wrapSuccess({ documents: userDocuments });
  }

  @Post()
  @ApiOperation({ summary: 'Создать документ' })
  @ApiResponse({
    status: 200,
    description: 'Документ',
    type: PostDocumentResponse
  })
  @ApiBearerAuth()
  async createCollection(
    @Req() request: Request,
    @Body() body: PostDocumentDto
  ): Promise<PostDocumentResponse> {
    const token = request.cookies.access_token;

    const user = await this.usersService.getUserByToken(token);

    const document = await this.documentsService.createDocument({
      collectionId: body.collectionId,
      creatorId: user.id
    });

    return this.wrapSuccess({ document });
  }
}
