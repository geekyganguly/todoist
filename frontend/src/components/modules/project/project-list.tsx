import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/modules/project/project-card";

import { useGetInfiniteProjectsApi } from "@/api/query/project";

export function ProjectList() {
  const {
    data: projects,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteProjectsApi();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {isLoading && (
        <>
          {Array.from({ length: 4 }, (_, i) => i).map((id) => (
            <Skeleton key={`loader-${id}`} className="h-40" />
          ))}
        </>
      )}

      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {hasNextPage && (
        <div className="h-20 col-span-2 flex justify-center items-center">
          <Button
            variant="secondary"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage && <LoaderCircle className="animate-spin" />}
            <span>Load More</span>
          </Button>
        </div>
      )}
    </div>
  );
}
