import { Controller, Post, Get, Body } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { RegisterDto } from './dtos/RegisterDto';
import { GetUserFromRequest } from '../user/get-user-from-request.decorator';
import { UserLeaderboard } from '@dacodes/lib';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly service: LeaderboardService) {}

  @Post('register')
  addScore(
    @GetUserFromRequest() user: UserLeaderboard,
    @Body() dto: RegisterDto
  ) {
    return this.service.addScore(user, dto);  }

  @Get('top10')
  fetchTop10() {
    return this.service.fetchTop10();  }
}