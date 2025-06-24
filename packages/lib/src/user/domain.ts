import { Company } from "../profile";

export enum UserRole {
  admin = "admin",
  moderator = "moderator",
  user = "user",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  username: string;
  image: string;
  company: Company;
  role: UserRole;
}

export interface UserLeaderboard {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface UserScore {
  user: UserLeaderboard;
  time: number;
}
