import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt-auth.service';
import { JwtService } from './jwt.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
  providers: [
    JwtService,
    {
      provide: AuthService,
      useClass: JwtAuthService, // Use JwtAuthService as the implementation for AuthService or create another one and use it here instead
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
