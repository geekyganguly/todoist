import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/api/base";
import { queryKeys } from "@/api/query/project";
import {
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  shareProjectApi,
  updateProjectUserApi,
  deleteProjectUserApi,
} from "@/api/project";

export function useCreateProjectApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return createProjectApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.infiniteProjects] });
    },
  });
}

export function useUpdateProjectApi(projectId: number) {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return updateProjectApi(projectId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.infiniteProjects] });
    },
  });
}

export function useDeleteProjectApi(projectId: number) {
  return useMutation({
    mutationFn: () => {
      return deleteProjectApi(projectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.infiniteProjects] });
    },
  });
}

export function useShareProjectApi(projectId: number) {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return shareProjectApi(projectId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectUsers, projectId],
      });
    },
  });
}

export function useUpdateProjectUserApi(projectId: number, userId: number) {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return updateProjectUserApi(projectId, userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectUsers, projectId],
      });
    },
  });
}

export function useDeleteProjectUserApi(projectId: number, userId: number) {
  return useMutation({
    mutationFn: () => {
      return deleteProjectUserApi(projectId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectUsers, projectId],
      });
    },
  });
}
