import { Injectable, Logger } from '@nestjs/common';
import { LoggerInterface } from './logger.interface';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor(private readonly context: string) {
    this.logger = new Logger(context);
  }

  log(message: string, meta?: any) {
    if (meta) {
      this.logger.log(message, meta);
    } else {
      this.logger.log(message);
    }
  }

  warn(message: string, meta?: any) {
    if (meta) {
      this.logger.warn(message, meta);
    } else {
      this.logger.warn(message);
    }
  }

  error(message: string, trace?: string, meta?: any) {
    if (meta) {
      this.logger.error(message, trace, meta);
    } else {
      this.logger.error(message, trace);
    }
  }

  debug(message: string, meta?: any) {
    if (meta) {
      this.logger.debug(message, meta);
    } else {
      this.logger.debug(message);
    }
  }
}
