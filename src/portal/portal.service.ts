import { Injectable } from '@nestjs/common';
import { LogUtilService } from 'src/_common/services/log-util.service';
import { SignupRequestDto } from './_dto/signup-request.dto';
import { SuccessResponseDto } from './_dto/success-response.dto';
import { HashUtilService } from 'src/_common/services/hash-util.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/_common/mongo-schema/user-schema';
import { CustomException } from 'src/_common/exceptions/custom.exception';
import { PortalError } from 'src/_common/errors/portal.error';
import { AuthService } from 'src/auth/auth.service';
import { OtpRequestDto } from './_dto/otp-request.dto';
import { OtpResponseDto } from './_dto/otp-response.dto';
import { LoginRequestDto } from './_dto/login-request.dto';
import { LoginResponseDto } from './_dto/login-response.dto';
import { ProfileResponseDto } from './_dto/profile-response.dto';
import { UpdateProfileRequestDto } from './_dto/update-profile-request.dto';
import { toLower, trim } from 'lodash';

@Injectable()
export class PortalService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private hashUtilService: HashUtilService,
    private logger: LogUtilService,
  ) {
    this.logger.setContext(PortalService.name);
  }

  async signup(dto: SignupRequestDto): Promise<SuccessResponseDto> {
    this.logger.log('signup');

    const { username, password, email } = dto;
    const user: User = await this.userService.findUserByUsername(username);
    if (user) {
      throw new CustomException(PortalError.USER.USERNAME_EXIST);
    }

    const hashedPassword = await this.hashUtilService.hash(trim(password));

    await this.userService.createUser(
      trim(username),
      hashedPassword,
      toLower(trim(email)),
    );

    return {
      message: 'User registered successfully',
    };
  }

  async requestOtp(dto: OtpRequestDto): Promise<OtpResponseDto> {
    this.logger.log('requestOtp');

    const { username, password } = dto;

    return this.authService.requestOtp(username, password);
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    this.logger.log('login');

    const { username, otp } = dto;

    return this.authService.login(username, otp);
  }

  async profile(user: User): Promise<ProfileResponseDto> {
    return {
      userId: user['_id'],
      name: user.name,
      username: user.username,
      email: user.email,
    };
  }

  async updateProfile(
    user: User,
    dto: UpdateProfileRequestDto,
  ): Promise<SuccessResponseDto> {
    const { name, email } = dto;

    if (name) {
      user.name = trim(name);
    }
    if (email) {
      user.email = toLower(trim(email));
    }

    await this.userService.updateUser(user);

    return {
      message: 'Profile updated successfully',
    };
  }

  async refreshToken(user: User): Promise<LoginResponseDto> {
    this.logger.log('refreshToken');

    return this.authService.refreshToken(user);
  }
}
