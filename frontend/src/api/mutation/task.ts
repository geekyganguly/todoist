import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/api/base";
import { queryKeys } from "@/api/query/task";
import { createTaskApi, deleteTaskApi, updateTaskApi } from "@/api/task";

export function useCreateTaskApi(projectId: number) {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return createTaskApi(projectId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks, projectId] });
    },
  });
}

export function useUpdateTaskApi(projectId: number, taskId: number) {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return updateTaskApi(projectId, taskId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks, projectId] });
    },
  });
}

export function useDeleteTaskApi(projectId: number, taskId: number) {
  return useMutation({
    mutationFn: () => {
      return deleteTaskApi(projectId, taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks, projectId] });
    },
  });
}
