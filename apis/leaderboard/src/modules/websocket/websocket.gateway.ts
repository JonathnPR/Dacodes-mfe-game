import { UserScore } from "@dacodes/lib";
import { UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsGuard } from "./guards/websockets.guards";

@WebSocketGateway(+process.env.VITE_APP_RANKING_WS_PORT!, {
  cors: {
    origin: "*",
  },
})
@UseGuards(WsGuard)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  emitUpdate(leaderboardUsers: UserScore[]) {
    this.server.emit("leaderboard:update", leaderboardUsers);
  }
}
