import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { RegisterDto } from './dtos/RegisterDto';
import { UserLeaderboard, UserScore } from '@dacodes/lib';

const LEADERBOARD_CACHE_KEY = 'leaderboard';

@Injectable()
export class LeaderboardService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly wsGateway: WebsocketGateway
  ) {}

  async fetchTop10(): Promise<UserScore[]> {
    const users: UserScore[] = (await this.cache.get(LEADERBOARD_CACHE_KEY)) || [];
    return users.sort((a, b) => a.time - b.time).slice(0, 10);
  }

  async addScore(user: UserLeaderboard, dto: RegisterDto): Promise<void> {
    const users: UserScore[] = (await this.cache.get(LEADERBOARD_CACHE_KEY)) || [];
    let entry = users.find(u => u.user.id === user.id);

    if (entry) {
      if (dto.score < entry.time) {
        entry.time = dto.score;
      }
    } else {
      entry = { user, time: dto.score };
      users.push(entry);
    }

    try {
      await this.cache.set(LEADERBOARD_CACHE_KEY, users, 0);
      const top10 = await this.fetchTop10();
      this.wsGateway.emitUpdate(top10);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }
}
