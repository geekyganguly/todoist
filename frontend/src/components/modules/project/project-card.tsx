import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TaskAdd } from "@/components/modules/task/task-add";
import { TaskList } from "@/components/modules/task/task-list";
import { ProjectDelete } from "@/components/modules/project/project-delete";
import { ProjectShare } from "@/components/modules/project/project-share";

import { Project } from "@/types/project";
import { formatDate } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{formatDate(project.updated_at)}</CardDescription>
        </div>

        <div className="flex items-center gap-1">
          {project.is_shared && (
            <>
              <Badge variant="secondary" className="px-4 h-9 rounded-full">
                Shared
              </Badge>
            </>
          )}

          {project.is_owner && (
            <div className="flex items-center gap-1">
              <ProjectDelete project={project} />
              <ProjectShare project={project} />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <TaskList project={project} />
      </CardContent>

      {(project.is_owner || project.is_editor) && (
        <CardFooter>
          <TaskAdd project={project} />
        </CardFooter>
      )}
    </Card>
  );
}
