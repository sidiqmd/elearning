import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonModule } from 'src/_common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
