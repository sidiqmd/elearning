import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { User } from '../mongo-schema/user-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortalError } from '../errors/portal.error';
import { CustomException } from '../exceptions/custom.exception';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { userId } = payload;

    const user: User = await this.userModel.findById(userId);

    if (!user) {
      throw new CustomException(PortalError.LOGIN.INVALID_ACCESS_TOKEN);
    }

    return user;
  }
}
