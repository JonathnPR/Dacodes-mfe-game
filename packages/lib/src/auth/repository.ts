import { AuthUser } from "./domain";
import { LoginDto } from "./dto";

export interface AuthRepository {
  login: (dto: LoginDto) => Promise<AuthUser>;
}
