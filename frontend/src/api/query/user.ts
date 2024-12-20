import { useQuery } from "@tanstack/react-query";

import { QueryOpts } from "@/types/base";
import { User } from "@/types/auth";
import { searchUsersApi } from "@/api/user";

export const queryKeys = Object.freeze({
  users: "users",
});

export function useSearchUsersApi(query: string, opts?: QueryOpts) {
  const fetcher = async () => {
    const res = await searchUsersApi(query, { params: opts?.params });
    return res.data.data;
  };

  return useQuery<User[]>({
    queryKey: [queryKeys.users, query, opts?.params?.toString()],
    queryFn: fetcher,
    ...opts,
  });
}
