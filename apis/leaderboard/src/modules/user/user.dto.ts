import { UserLeaderboard } from "@dacodes/lib";
import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class UserTokenDto implements UserLeaderboard {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  firstName: string;

  @IsString()
  @Expose()
  image: string;

  @IsString()
  @Expose()
  lastName: string;

  @IsString()
  @Expose()
  username: string;
}
