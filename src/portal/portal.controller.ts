import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PortalError } from 'src/_common/errors/portal.error';
import { LogUtilService } from 'src/_common/services/log-util.service';
import { SignupRequestDto } from './_dto/signup-request.dto';
import { PortalService } from './portal.service';
import { SuccessResponseDto } from './_dto/success-response.dto';
import { OtpRequestDto } from './_dto/otp-request.dto';
import { OtpResponseDto } from './_dto/otp-response.dto';
import { LoginRequestDto } from './_dto/login-request.dto';
import { LoginResponseDto } from './_dto/login-response.dto';
import { GetUser } from 'src/_common/decorators/get-user.decorator';
import { User } from 'src/_common/mongo-schema/user-schema';
import { ProfileResponseDto } from './_dto/profile-response.dto';
import { AccessAuthGuard } from 'src/_common/guards/access.guard';
import { UpdateProfileRequestDto } from './_dto/update-profile-request.dto';
import { RefreshAuthGuard } from 'src/_common/guards/refresh.guard';

@ApiTags('portal')
@Controller('portal')
export class PortalController {
  constructor(
    private portalService: PortalService,
    private logger: LogUtilService,
  ) {
    this.logger.setContext(PortalController.name);
  }

  @Get('health')
  @ApiOperation({ summary: 'Service Health check' })
  health(): string {
    return 'Ok';
  }

  @Post('signup')
  @ApiCreatedResponse({
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  signup(@Body() dto: SignupRequestDto): Promise<SuccessResponseDto> {
    this.logger.log('signup', {
      email: dto.email,
    });

    return this.portalService.signup(dto);
  }

  @Post('otp')
  @ApiCreatedResponse({
    type: OtpResponseDto,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  requestOtp(@Body() dto: OtpRequestDto): Promise<OtpResponseDto> {
    this.logger.log('requestOtp', {
      email: dto.username,
    });

    return this.portalService.requestOtp(dto);
  }

  @Post('login')
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    this.logger.log('login', {
      email: dto.username,
    });

    return this.portalService.login(dto);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessAuthGuard)
  @ApiOkResponse({
    type: ProfileResponseDto,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  profile(@GetUser() user: User): Promise<ProfileResponseDto> {
    this.logger.log('profile');

    return this.portalService.profile(user);
  }

  @Patch('profile')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessAuthGuard)
  @ApiOkResponse({
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  updateProfile(
    @GetUser() user: User,
    @Body() dto: UpdateProfileRequestDto,
  ): Promise<SuccessResponseDto> {
    this.logger.log('updateProfile');

    return this.portalService.updateProfile(user, dto);
  }

  @Post('refresh-token')
  @ApiBearerAuth('refresh-token')
  @UseGuards(RefreshAuthGuard)
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  refreshToken(@GetUser() user: User): Promise<LoginResponseDto> {
    this.logger.log('refreshToken');

    return this.portalService.refreshToken(user);
  }
}
