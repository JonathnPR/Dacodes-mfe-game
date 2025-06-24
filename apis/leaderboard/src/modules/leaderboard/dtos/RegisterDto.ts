import { IsNumber, IsString, Min } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsNumber()
  @Min(0)
  score: number;
} 