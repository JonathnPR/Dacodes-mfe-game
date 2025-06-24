import type { AuthRepository } from "@dacodes/lib";
import { type LoginDto } from '@dacodes/lib'

import httpClient, { setToken } from "@dacodes/shell/httpClient";

export const loginService: AuthRepository = {
  async login(dto: LoginDto) {
    return httpClient.post("/auth/login", dto).then((response) => {
      setToken(response.data.accessToken);
      return response.data;
    });
  },
};
