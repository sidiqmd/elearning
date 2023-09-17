import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomException } from 'src/_common/exceptions/custom.exception';
import { PortalError } from '../errors/portal.error';

@Injectable()
export class AccessAuthGuard extends AuthGuard('access-jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info && info.message === 'jwt expired') {
      throw new CustomException(PortalError.JWT.EXPIRED);
    }
    if (info && info.message === 'invalid signature') {
      throw new CustomException(PortalError.JWT.INVALID);
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
