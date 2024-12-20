import { useQuery } from "@tanstack/react-query";

import { Task } from "@/types/task";
import { getTasksApi } from "@/api/task";

export const queryKeys = Object.freeze({
  tasks: "tasks",
});

export function useGetTasksApi(projectId: number) {
  const fetcher = async () => {
    const res = await getTasksApi(projectId);
    return res.data.data;
  };

  return useQuery<Task[]>({
    queryKey: [queryKeys.tasks, projectId],
    queryFn: fetcher,
  });
}
