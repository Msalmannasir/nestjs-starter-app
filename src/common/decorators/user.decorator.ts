import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '@modules/auth/auth.interface';

export const User = createParamDecorator(
  (data: keyof AuthPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
