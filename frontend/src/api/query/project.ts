import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Project, SharedProject } from "@/types/project";
import { getProjectsApi, getProjectShareListApi } from "@/api/project";

export const queryKeys = Object.freeze({
  projects: "projects",
  infiniteProjects: "infinite-projects",
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
