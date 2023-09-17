import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortalError } from 'src/_common/errors/portal.error';
import { CustomException } from 'src/_common/exceptions/custom.exception';
import { OneTimeToken } from 'src/_common/mongo-schema/one-time-token.schema';
import { User } from 'src/_common/mongo-schema/user-schema';
import { HashUtilService } from 'src/_common/services/hash-util.service';
import { LogUtilService } from 'src/_common/services/log-util.service';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';
import { JwtUtilService } from 'src/_common/services/jwt-util.service';
import { OtpResponseDto } from 'src/portal/_dto/otp-response.dto';
import { LoginResponseDto } from 'src/portal/_dto/login-response.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(OneTimeToken.name)
    private oneTimeTokenModel: Model<OneTimeToken>,
    private jwtUtilService: JwtUtilService,
    private hashUtilService: HashUtilService,
    private configService: ConfigService,
    private logger: LogUtilService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  private generateOtp(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    this.logger.log('generateOtp', {
      otp,
    });

    return otp;
  }

  async requestOtp(
    username: string,
    password: string,
  ): Promise<OtpResponseDto> {
    const user: User = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new CustomException(PortalError.LOGIN.INVALID_CREDENTIALS);
    }

    if (!(await this.hashUtilService.compare(password, user.password))) {
      throw new CustomException(PortalError.LOGIN.INVALID_CREDENTIALS);
    }

    const otpCode = this.generateOtp();
    const expiredAt = DateTime.now().plus({ minutes: 3 });

    await this.oneTimeTokenModel.create({
      refId: username,
      token: await this.hashUtilService.hash(otpCode),
      type: 'email-otp',
      expiredAt,
    });

    if (this.configService.get<string>('NODE_ENV') === 'production') {
      // Send Email
      //   this.eventEmitter.emit('email.otp.send', {
      //     email: user.email,
      //     otpCode,
      //     expiredAt,
      //   });

      return {};
    } else {
      return {
        otp: otpCode,
        expiredAt: expiredAt.toJSDate(),
      };
    }
  }

  async login(username: string, otp: string): Promise<LoginResponseDto> {
    const oneTimeTokens: OneTimeToken[] = await this.oneTimeTokenModel
      .find({
        refId: username,
        type: 'email-otp',
      })
      .exec();

    if (oneTimeTokens.length === 0) {
      throw new CustomException(PortalError.LOGIN.INVALID_OTP);
    }

    let validOtp = false;
    for (const oneTimeToken of oneTimeTokens) {
      if (await this.hashUtilService.compare(otp, oneTimeToken.token)) {
        validOtp = true;

        await this.oneTimeTokenModel.deleteOne({
          _id: oneTimeToken['_id'],
        });

        break;
      }
    }

    if (!validOtp) {
      throw new CustomException(PortalError.LOGIN.INVALID_OTP);
    }

    const user: User = await this.userModel.findOne({ username }).exec();
    const payload: JwtPayload = {
      userId: user['_id'],
    };
    const accessToken: string =
      this.jwtUtilService.generateAccessToken(payload);
    const refreshToken = this.jwtUtilService.generateRefreshToken(payload);

    return {
      message: 'Login success',
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(user: User): Promise<LoginResponseDto> {
    const payload: JwtPayload = {
      userId: user['_id'],
    };
    const accessToken: string =
      this.jwtUtilService.generateAccessToken(payload);
    const refreshToken = this.jwtUtilService.generateRefreshToken(payload);

    return {
      message: 'Refresh success',
      accessToken,
      refreshToken,
    };
  }
}
