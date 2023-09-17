import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
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
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '$property is too weak',
  })
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
