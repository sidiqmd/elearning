import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LogUtilService } from './log-util.service';

@Injectable()
export class JwtUtilService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LogUtilService,
  ) {
    this.logger.setContext(JwtUtilService.name);
  }

  generateAccessToken(payload: any, scheme = 'Bearer'): string {
    this.logger.log('generateAccessToken', { payload });
    return `${scheme} ${this.jwtService.sign(payload)}`;
  }
  generateRefreshToken(payload: any, scheme = 'Bearer') {
    this.logger.log('generateRefreshToken', { payload });
    return `${scheme} ${this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
    })}`;
  }
}
