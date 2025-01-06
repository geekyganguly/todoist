import { useState } from "react";

import { TaskDelete } from "@/components/modules/task/task-delete";
import { TaskEdit, TaskEditButton } from "@/components/modules/task/task-edit";
import { TaskCompleteToggle } from "@/components/modules/task/task-complete-toggle";

import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

export function TaskCard({ task, index }: { task: Task; index: number }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1 flex items-center gap-2">
        {task.permissions.can_update && <TaskCompleteToggle task={task} />}

        {isEditing ? (
          <TaskEdit task={task} closeEditing={() => setIsEditing(false)} />
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <p>
              {!task.permissions.can_update && <span>{index + 1}. </span>}
              <span
                className={cn(
                  "font-semibold leading-none tracking-tight",
                  task.is_completed && "line-through"
                )}
              >
                {task.title}
              </span>
            </p>

            {task.permissions.can_update && (
              <TaskEditButton onClick={() => setIsEditing(true)} />
            )}
          </div>
        )}
      </div>

      {task.permissions.can_delete && (
        <div className="flex gap-1">
          <TaskDelete task={task} />
        </div>
      )}
    </div>
  );
}
