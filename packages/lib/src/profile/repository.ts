import { UserProfile } from "./domain";

export interface ProfileRepository {
  getProfileById(id: number): Promise<UserProfile>;
}
