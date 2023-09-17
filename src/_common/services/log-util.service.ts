import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LogUtilService extends Logger {
  constructor(private logger: Logger) {
    super();
  }

  setContext(context: string) {
    this.logger = new Logger(context);
  }

  log(message: string, args?: any | any[]) {
    this.logger.log({ message, ...args });
  }
}
