import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Request } from "express";
import { jwtDecode } from "jwt-decode";
import { UserTokenDto } from "../user/user.dto";

interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Guard for validating JWT authentication on incoming requests.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  /**
   * Main guard logic to check for a valid JWT in the Authorization header.
   */
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const jwt = this.getJwtFromHeader(req);

    if (!jwt) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = jwtDecode(jwt);
      req.user = plainToInstance(UserTokenDto, payload, { excludeExtraneousValues: true });
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Helper to extract the JWT from the Authorization header.
   */
  private getJwtFromHeader(req: Request): string | undefined {
    const authHeader = req.headers.authorization;
    if (!authHeader) return undefined;
    const [scheme, token] = authHeader.split(' ');
    return scheme === 'Bearer' ? token : undefined;
  }
}
