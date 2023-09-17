import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomException } from 'src/_common/exceptions/custom.exception';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { User } from '../mongo-schema/user-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortalError } from '../errors/portal.error';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  'access-jwt',
) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
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
