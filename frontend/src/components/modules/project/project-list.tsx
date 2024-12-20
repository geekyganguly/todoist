import { ProjectCard } from "@/components/modules/project/project-card";
import { useGetProjectsApi } from "@/api/query/project";

export function ProjectList() {
  const { data } = useGetProjectsApi();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
