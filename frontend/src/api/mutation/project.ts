import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/api/base";
import { queryKeys } from "@/api/query/project";
import {
  createProjectApi,
  deleteProjectApi,
  createProjectSharingApi,
  updateProjectSharingApi,
  deleteProjectSharingApi,
} from "@/api/project";

export function useCreateProjectApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return createProjectApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
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
    },
  });
}

export function useCreateProjectSharingApi(projectId: number) {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return createProjectSharingApi(projectId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectSharing, projectId],
      });
    },
  });
}

export function useUpdateProjectSharingApi(projectId: number, userId: number) {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return updateProjectSharingApi(projectId, userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectSharing, projectId],
      });
    },
  });
}

export function useDeleteProjectSharingApi(projectId: number, userId: number) {
  return useMutation({
    mutationFn: () => {
      return deleteProjectSharingApi(projectId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projectSharing, projectId],
      });
    },
  });
}
