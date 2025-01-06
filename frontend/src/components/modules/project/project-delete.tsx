import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, LoaderCircleIcon, TrashIcon, XIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Project } from "@/types/project";
import { useDeleteProjectApi } from "@/api/mutation/project";
import { cn } from "@/lib/utils";

export function ProjectDelete({ project }: { project: Project }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutateAsync: deleteProject, isPending } = useDeleteProjectApi(
    project.id
  );

  const onSubmit = () => {
    deleteProject()
      .then(() => {
        toast.success("Task list deleted successfully");
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
            className="rounded-full shadow-none size-7 text-orange-500"
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
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
