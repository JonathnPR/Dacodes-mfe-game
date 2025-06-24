import type { UserPagination } from "@dacodes/lib";

import httpClient from "@dacodes/shell/httpClient";

export const userDirectoryService = {
  async getAll({ q, skip, limit }: { q: string; skip: number; limit: number }): Promise<UserPagination> {
    return httpClient
      .get(`/users/search?q=${q}&limit=${limit}&skip=${skip}`)
      .then((response) => response.data);
  },
  async getAllInfinite(e: any): Promise<UserPagination> {
    const q = e.q || '';
    const pageParam = e.pageParam || 0;
    const limit = 15;
    const skip = pageParam * limit;
    return httpClient
      .get(`/users/search?q=${q}&limit=${limit}&skip=${skip}`)
      .then((response) => response.data);
  },
};
