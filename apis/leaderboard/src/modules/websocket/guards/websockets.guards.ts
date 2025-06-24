import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Injectable()
export class WsGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    const token = this.extractTokenFromHeader(client);

    if (!token) {
      throw new WsException("Unauthorized");
    }

    return true;
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    const [type, token] =
      (client.handshake?.query?.token as string)?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
