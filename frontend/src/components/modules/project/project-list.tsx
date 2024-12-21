import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/modules/project/project-card";

import { useGetProjectsApi } from "@/api/query/project";

export function ProjectList() {
  const { data: projects, isLoading } = useGetProjectsApi();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {isLoading && (
        <>
          {Array.from({ length: 6 }, (_, i) => i).map((id) => (
            <Skeleton key={`loader-${id}`} className="h-40" />
          ))}
        </>
      )}

      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
