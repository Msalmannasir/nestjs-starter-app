import { LoggerService } from '@common/logger/logger.service';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor {
  private readonly logger = new LoggerService(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - now;
        this.logger.log('API Request', {
          method,
          url,
          statusCode: context.switchToHttp().getResponse().statusCode,
          durationMs: duration,
        });
      }),
    );
  }
}
