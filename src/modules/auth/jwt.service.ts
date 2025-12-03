import { LoggerService } from '@common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import jwt, { SignOptions } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly logger = new LoggerService(JwtService.name);
  private readonly secret = process.env.JWT_SECRET || 'defaultSecret';
  private readonly defaultOptions: SignOptions = { expiresIn: '1h' };

  sign(payload: Record<string, any>, options?: SignOptions): string {
    this.logger.log(`Signing payload: ${JSON.stringify(payload)}`);
    return jwt.sign(payload, this.secret, {
      ...this.defaultOptions,
      ...options,
    });
  }

  verify<T = any>(token: string): T {
    try {
      this.logger.log(`Verifying token: ${token}`);
      return jwt.verify(token, this.secret) as T;
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}
