import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserLeaderboard } from '@dacodes/lib';

export const GetUserFromRequest = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserLeaderboard => {
    const req = ctx.switchToHttp().getRequest();
    return req.user as UserLeaderboard;
  }
); 