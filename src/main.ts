import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error({
      timestamp: new Date().toISOString(),
      statusCode: 'BOOTSTRAP_ERROR',
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}
bootstrap();
