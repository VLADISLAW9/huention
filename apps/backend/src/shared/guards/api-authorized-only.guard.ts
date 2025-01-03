import type { CanActivate } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';

import { ApiAuthGuard } from './api-auth.guard';

export const ApiAuthorizedOnly = (...otherGuards: (any | CanActivate)[]) =>
  UseGuards(ApiAuthGuard, ...otherGuards);
