import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
