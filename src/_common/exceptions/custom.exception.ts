import { HttpException, Logger } from '@nestjs/common';
import { ErrorDto } from './error.dto';

export class CustomException extends HttpException {
  private logger = new Logger('CustomException');

  constructor(private detail: ErrorDto) {
    super(detail, detail.statusCode);
    this.logger.error(detail);
  }
}
