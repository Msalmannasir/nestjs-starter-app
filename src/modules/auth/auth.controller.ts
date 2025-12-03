import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { User } from '@common/decorators/user.decorator';
import type { AuthPayload } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { userId: string; password: string }) {
    const user: AuthPayload = await this.authService.validateUser({
      userId: body.userId,
    });

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: AuthPayload) {
    return {
      user,
      message: 'This route is protected!',
    };
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const payload = await this.authService.verifyToken(body.refreshToken);
    return this.authService.login(payload);
  }
}
