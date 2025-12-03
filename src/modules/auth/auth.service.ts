import { AuthPayload } from './auth.interface';

export abstract class AuthService {
  abstract validateUser(payload: AuthPayload): Promise<AuthPayload>;
  abstract login(
    payload: AuthPayload,
  ): Promise<{ accessToken: string; refreshToken?: string }>;
  abstract verifyToken(token: string): Promise<AuthPayload>;
}
