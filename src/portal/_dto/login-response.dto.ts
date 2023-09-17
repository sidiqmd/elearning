import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponseDto } from './success-response.dto';

export class LoginResponseDto extends SuccessResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
