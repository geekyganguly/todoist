import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Project, ProjectUser } from "@/types/project";
import { getProjectsApi, getProjectUsersApi } from "@/api/project";

export const queryKeys = Object.freeze({
  projects: "projects",
  infiniteProjects: "infinite-projects",
  projectUsers: "project-users",
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

export function useGetInfiniteProjectsApi() {
  const fetcher = async ({ pageParam }: { pageParam: number }) => {
    const res = await getProjectsApi({
      params: { page: pageParam },
    });
    return res.data;
  };

  const query = useInfiniteQuery({
    queryKey: [queryKeys.infiniteProjects],
    queryFn: fetcher,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.meta.has_more_pages ? lastPageParam + 1 : undefined;
    },
  });

  const data: Project[] = query.data
    ? [].concat(...query.data.pages.map((i) => i.data))
    : [];

  return { ...query, data };
}

export function useGetProjectUsersApi(projectId: number) {
  const fetcher = async () => {
    const res = await getProjectUsersApi(projectId);
    return res.data.data;
  };

  return useQuery<ProjectUser[]>({
    queryKey: [queryKeys.projectUsers, projectId],
    queryFn: fetcher,
  });
}
