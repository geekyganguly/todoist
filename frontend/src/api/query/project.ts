import { useQuery } from "@tanstack/react-query";

import { Project, SharedProject } from "@/types/project";
import { getProjectsApi, getProjectSharingApi } from "@/api/project";

export const queryKeys = Object.freeze({
  projects: "projects",
  projectSharing: "project-sharing",
});

export function useGetProjectsApi() {
  const fetcher = async () => {
    const res = await getProjectsApi();
    return res.data.data;
  };

  return useQuery<Project[]>({
    queryKey: [queryKeys.projects],
    queryFn: fetcher,
  });
}

export function useGetProjectSharingApi(projectId: number) {
  const fetcher = async () => {
    const res = await getProjectSharingApi(projectId);
    return res.data.data;
  };

  return useQuery<SharedProject[]>({
    queryKey: [queryKeys.projectSharing, projectId],
    queryFn: fetcher,
  });
}
