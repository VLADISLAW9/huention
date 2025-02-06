import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

const JWT_GUARD = 'jwt';

@Injectable()
export class ApiAuthGuard extends AuthGuard(JWT_GUARD) {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies.access_token;

    if (!token) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
