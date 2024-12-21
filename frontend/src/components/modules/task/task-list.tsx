import { Skeleton } from "@/components/ui/skeleton";
import { TaskCard } from "@/components/modules/task/task-card";

import { useGetTasksApi } from "@/api/query/task";
import { Project } from "@/types/project";

export function TaskList({ project }: { project: Project }) {
  const { data: tasks, isLoading } = useGetTasksApi(project.id);

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          {Array.from({ length: 6 }, (_, i) => i).map((id) => (
            <Skeleton key={`loader-${id}`} className="h-8" />
          ))}
        </>
      )}

      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
