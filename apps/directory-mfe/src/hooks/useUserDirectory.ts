import { queryKeys, type User } from "@dacodes/lib";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { userDirectoryService } from "../services/userDirectory.service";
import type { UserPagination } from "@dacodes/lib";

export function useUsers() {
  const usersGetAll = (q: string) =>
    useInfiniteQuery({
      queryKey: [queryKeys.users, q],
      queryFn: (e) => userDirectoryService.getAll({ q, skip: e.pageParam * 15, limit: 15 }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.users.length === 0 || lastPage.users.length < 15) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
        if (firstPageParam <= 0) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });

  return {
    usersGetAll,
  };
}

export function useUserDirectoryPaginated(q: string, skip: number, limit: number) {
  return useQuery<UserPagination, Error>({
    queryKey: [queryKeys.users, q, skip, limit],
    queryFn: () => userDirectoryService.getAll({ q, skip, limit })
  });
}
