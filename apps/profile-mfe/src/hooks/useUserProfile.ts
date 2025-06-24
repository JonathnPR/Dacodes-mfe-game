import { queryKeys } from "@dacodes/lib";
import { useQuery } from "@tanstack/react-query";
import { userProfileService } from "../services/userProfile.service";

export function useUserProfile() {
  const profilesGetById = (id: number) =>
    useQuery({
      queryKey: [queryKeys.users, "profiles", id],
      queryFn: () => userProfileService.getProfileById(id),
    });

  return {
    profilesGetById,
  };
}
