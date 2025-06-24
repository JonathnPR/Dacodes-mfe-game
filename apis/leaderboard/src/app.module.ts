import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { GlobalConfigModule } from "./modules/config/config.module";
import { LeaderboardModule } from "./modules/leaderboard/leaderboard.module";
import { WebsocketModule } from "./modules/websocket/websocket.module";
import { JwtAuthGuard } from "./modules/auth/JwtAuthGuard";

@Module({
  imports: [GlobalConfigModule, WebsocketModule, LeaderboardModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
