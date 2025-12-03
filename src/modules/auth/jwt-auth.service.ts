import { LoggerService } from '@common/logger/logger.service';
import { AuthService } from './auth.service';
import { AuthPayload } from './auth.interface';
import { JwtService } from './jwt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthService extends AuthService {
  private readonly logger = new LoggerService(JwtAuthService.name);

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async validateUser(payload: AuthPayload): Promise<AuthPayload> {
    this.logger.log(`Validating user with payload: ${JSON.stringify(payload)}`);
    return payload;
  }

  async login(payload: AuthPayload) {
    this.logger.log(`Logging in user: ${JSON.stringify(payload)}`);
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async verifyToken(token: string): Promise<AuthPayload> {
    this.logger.log(`Verifying token: ${token}`);
    return this.jwtService.verify<AuthPayload>(token);
  }
}
