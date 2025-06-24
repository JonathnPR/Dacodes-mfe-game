import type { LeaderBoardRepository } from "@dacodes/lib";
import httpClient from "@dacodes/shell/httpClient";

const api = `${import.meta.env.VITE_API_RANK_URL}/leaderboard`;

export const leaderboardService: LeaderBoardRepository = {
  fetchTop10: async () => {
    return httpClient.get(`${api}/top10`).then((res) => res.data);
  },

  addScore: async (dto) => {
    return httpClient.post(api, dto).then((res) => res.data);
  },
};

export async function getMemoryCardLeaderboard() {
  return [];
}
