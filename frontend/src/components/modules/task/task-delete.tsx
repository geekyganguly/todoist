import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, LoaderCircleIcon, TrashIcon, XIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Task } from "@/types/task";
import { useDeleteTaskApi } from "@/api/mutation/task";
import { cn } from "@/lib/utils";

export function TaskDelete({ task }: { task: Task }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutateAsync: deleteTask, isPending } = useDeleteTaskApi(
    task.project.id,
    task.id
  );

  const onSubmit = () => {
    deleteTask()
      .then(() => {
        toast.success("Task deleted successfully");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsDeleting(false));
  };

  return (
    <div>
      {isDeleting ? (
        <div
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "flex items-center rounded-full p-1"
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-none size-7 text-destructive"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <CheckIcon />
            )}
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-none size-7"
            disabled={isPending}
            onClick={() => setIsDeleting(false)}
          >
            <XIcon />
          </Button>
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              onClick={() => setIsDeleting(true)}
            >
              <TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Task</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
