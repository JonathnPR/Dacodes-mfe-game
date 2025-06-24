import { IsNumber } from "class-validator";

export class RegisterScoreDto {
  @IsNumber()
  time: number;
}
