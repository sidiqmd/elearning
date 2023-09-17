import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpRequestDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
