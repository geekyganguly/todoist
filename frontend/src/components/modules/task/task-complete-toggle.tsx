import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTaskApi } from "@/api/mutation/task";
import { Task } from "@/types/task";

export function TaskCompleteToggle({ task }: { task: Task }) {
  const [checked, setChecked] = useState(false);

  const { mutateAsync: updateTask, isPending } = useUpdateTaskApi(
    task.project.id,
    task.id
  );

  const handleToggle = (value: boolean) => {
    updateTask({ is_completed: value }).then(() => setChecked(value));
  };

  useEffect(() => {
    setChecked(task.is_completed);
  }, [task.is_completed]);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={handleToggle}
      disabled={isPending}
    />
  );
}
