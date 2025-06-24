import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { WebsocketModule } from '../websocket/websocket.module';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: config.get<string>('VITE_CACHE_HOSTNAME'),
            port: config.get<number>('VITE_CACHE_PORT')!,
          },
        }),
        cacheId: 'leaderboard',
      }),
    }),
    WebsocketModule,
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}
