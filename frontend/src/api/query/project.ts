import { useQuery } from "@tanstack/react-query";

import { Project, SharedProject } from "@/types/project";
import { getProjectsApi, getProjectShareListApi } from "@/api/project";

export const queryKeys = Object.freeze({
  projects: "projects",
  projectShareList: "project-share-list",
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

export function useGetProjectShareListApi(projectId: number) {
  const fetcher = async () => {
    const res = await getProjectShareListApi(projectId);
    return res.data.data;
  };

  return useQuery<SharedProject[]>({
    queryKey: [queryKeys.projectShareList, projectId],
    queryFn: fetcher,
  });
}
