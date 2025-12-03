import { Controller, Get } from '@nestjs/common';
import { HealthResponseDto } from './dto/health.dto';

@Controller('health')
export class HealthController {
  @Get()
  checkHealth(): HealthResponseDto {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
