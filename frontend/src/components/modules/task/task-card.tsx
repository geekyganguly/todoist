import { useState } from "react";

import { TaskDelete } from "@/components/modules/task/task-delete";
import { TaskEdit, TaskEditButton } from "@/components/modules/task/task-edit";
import { TaskCompleteToggle } from "@/components/modules/task/task-complete-toggle";

import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

export function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1 flex items-center gap-2">
        {(task.project.is_owner || task.project.is_editor) && (
          <TaskCompleteToggle task={task} />
        )}

        {isEditing ? (
          <TaskEdit task={task} closeEditing={() => setIsEditing(false)} />
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <p
              className={cn(
                "font-semibold leading-none tracking-tight",
                task.is_completed && "line-through"
              )}
            >
              {task.title}
            </p>

            {(task.project.is_owner || task.project.is_editor) && (
              <TaskEditButton onClick={() => setIsEditing(true)} />
            )}
          </div>
        )}
      </div>

      {(task.project.is_owner || task.project.is_editor) && (
        <div className="flex gap-1">
          <TaskDelete task={task} />
        </div>
      )}
    </div>
  );
}
