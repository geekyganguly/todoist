import { toast } from "sonner";
import { LoaderCircleIcon, PlusCircleIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { useCreateTaskApi } from "@/api/mutation/task";
import { TaskFormData, useTaskAddForm } from "@/forms/task";
import { Project } from "@/types/project";

export function TaskAdd({ project }: { project: Project }) {
  const form = useTaskAddForm();

  const { mutateAsync: createTask, isPending } = useCreateTaskApi(project.id);

  const onSubmit = (data: TaskFormData) => {
    createTask(data)
      .then(() => {
        form.reset();
        toast.success("Task added successfully");
      })
      .catch(() => toast.error("Failed to add task"));
  };

  return (
    <Form {...form}>
      <form
        className="flex-1 flex items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <PlusCircleIcon className="size-6" />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  className="border-none shadow-none focus-visible:ring-0"
                  placeholder="add new task"
                  disabled={isPending}
                  error={!!form.formState.errors.title}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant="default" size="sm" type="submit" disabled={isPending}>
          {isPending && <LoaderCircleIcon className="animate-spin" />}
          <span>Add Task</span>
        </Button>
      </form>
    </Form>
  );
}
