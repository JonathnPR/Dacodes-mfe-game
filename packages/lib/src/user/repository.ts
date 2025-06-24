import { User, UserScore } from "./domain";
import { IRegisterScoreDto } from "./dto";

export interface UserPagination {
  users: User[];
  total: number;
  limit: number;
  skip: number;
}

export interface PaginationDto {
  q: string;
  pageParam: number;
}

export interface UserRepository {
  getAll(dto: PaginationDto): Promise<UserPagination>;
}

export interface LeaderBoardRepository {
  fetchTop10(): Promise<UserScore[]>;

  addScore(dto: IRegisterScoreDto): Promise<any>;
}
