import { TaskCard } from "@/components/modules/task/task-card";
import { useGetTasksApi } from "@/api/query/task";
import { Project } from "@/types/project";

export function TaskList({ project }: { project: Project }) {
  const { data: tasks } = useGetTasksApi(project.id);

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
