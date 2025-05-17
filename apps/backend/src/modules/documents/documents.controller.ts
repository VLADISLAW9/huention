import { Body, Controller, Get, NotFoundException, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { query, Request } from 'express';

import { ApiAuthorizedOnly, BaseResolver } from '@/shared';

import { UsersService } from '../users';
import { GetDocumentResponse, GetDocumentsResponse, PostDocumentResponse } from './documents.model';
import { DocumentsService } from './documents.service';
import { GetDocumentDto, PostDocumentDto } from './dto';

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
  @ApiOperation({ summary: 'Получить документы пользователя' })
  @ApiResponse({
    status: 200,
    description: 'документы пользователя',
    type: GetDocumentsResponse
  })
  @ApiBearerAuth()
  async getDocuments(@Req() request: Request): Promise<GetDocumentsResponse> {
    const user = await this.usersService.getUserByToken(request.cookies.access_token);

    const documents = await this.documentsService.getDocuments();

    if (!documents) {
      throw new NotFoundException('документы не найдены');
    }

    const userDocuments = documents.filter((document) => document.creatorId === user.id);

    return this.wrapSuccess({ documents: userDocuments });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить документ по id' })
  @ApiResponse({
    status: 200,
    description: 'Документ',
    type: GetDocumentsResponse
  })
  @ApiBearerAuth()
  async getDocument(
    @Req() request: Request,
    @Query() getDocumentDto: GetDocumentDto
  ): Promise<GetDocumentResponse> {
    const user = await this.usersService.getUserByToken(request.cookies.access_token);

    const document = await this.documentsService.getDocument(getDocumentDto.id);

    if (!document || document.creatorId !== user.id) {
      throw new NotFoundException('Документ не найден');
    }

    return this.wrapSuccess({ document });
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
    @Body() postDocumentDto: PostDocumentDto
  ): Promise<PostDocumentResponse> {
    const user = await this.usersService.getUserByToken(request.cookies.access_token);

    const document = await this.documentsService.createDocument({
      creatorId: user.id,
      parentDocumentId: postDocumentDto.parentDocumentId
    });

    return this.wrapSuccess({ document });
  }
}
