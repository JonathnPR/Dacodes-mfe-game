import httpClient from "@dacodes/shell/httpClient";

export const userProfileService = {
  async getProfileById(id: string) {
    return httpClient.get(`/users/${id}`).then((response) => response.data);
  },
};
