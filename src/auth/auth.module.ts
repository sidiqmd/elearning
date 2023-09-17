import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CommonModule } from 'src/_common/common.module';

@Module({
  imports: [CommonModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
