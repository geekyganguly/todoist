import { useState } from "react";

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
import {
  ProjectEditForm,
  ProjectEditButton,
} from "@/components/modules/project/project-edit";
import { ProjectShare } from "@/components/modules/project/project-share";

import { Project } from "@/types/project";
import { formatDate } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-1 space-y-0">
        {isEditing ? (
          <ProjectEditForm
            project={project}
            closeEditing={() => setIsEditing(false)}
          />
        ) : (
          <div className="flex-1 flex items-start justify-between gap-1">
            <div className="flex flex-col">
              <CardTitle className="text-lg">{project.title}</CardTitle>

              <CardDescription>
                {formatDate(project.updated_at)}
              </CardDescription>
            </div>

            {project.permissions.can_update && (
              <ProjectEditButton onClick={() => setIsEditing(true)} />
            )}
          </div>
        )}

        <div className="flex items-center gap-1">
          {project.permissions.can_delete && (
            <ProjectDelete project={project} />
          )}

          {project.permissions.can_share && <ProjectShare project={project} />}

          {project.is_shared && (
            <Badge variant="secondary" className="px-4 h-8 rounded-full">
              Shared
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <TaskList project={project} />
      </CardContent>

      {project.permissions.can_create_task && (
        <CardFooter>
          <TaskAdd project={project} />
        </CardFooter>
      )}
    </Card>
  );
}
