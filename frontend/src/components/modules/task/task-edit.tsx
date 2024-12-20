import { toast } from "sonner";
import { CheckIcon, LoaderCircleIcon, XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Task } from "@/types/task";
import { useUpdateTaskApi } from "@/api/mutation/task";
import { TaskFormData, useTaskEditForm } from "@/forms/task";
import { cn } from "@/lib/utils";

export function TaskEdit({
  task,
  closeEditing,
}: {
  task: Task;
  closeEditing: () => void;
}) {
  const form = useTaskEditForm(task);

  const { mutateAsync: updateTask, isPending } = useUpdateTaskApi(
    task.project.id,
    task.id
  );

  const onSubmit = (data: TaskFormData) => {
    updateTask(data)
      .then(() => {
        form.reset();
        toast.success("Task updated successfully");
      })
      .catch(() => toast.error("Failed to update task"))
      .finally(() => closeEditing());
  };

  return (
    <Form {...form}>
      <form
        className="flex-1 flex items-center justify-between"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  className="border-none shadow-none focus-visible:ring-0"
                  disabled={isPending}
                  error={!!form.formState.errors.title}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "flex items-center rounded-full p-1"
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-none size-7 text-green-600"
            type="submit"
            disabled={isPending}
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
            type="button"
            disabled={isPending}
            onClick={closeEditing}
          >
            <XIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
}
