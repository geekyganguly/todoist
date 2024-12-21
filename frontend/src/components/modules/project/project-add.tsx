import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { useCreateProjectApi } from "@/api/mutation/project";
import { ProjectFormData, useProjectForm } from "@/forms/project";

export function ProjectAdd() {
  const form = useProjectForm();

  const { mutateAsync: createProject, isPending } = useCreateProjectApi();

  const onSubmit = (data: ProjectFormData) => {
    createProject(data)
      .then(() => {
        form.reset();
        toast.success("Task list created successfully");
      })
      .catch(() => toast.error("Failed to create task list"));
  };

  return (
    <Form {...form}>
      <form
        className="flex items-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-10 text-base"
                  placeholder="New task list name"
                  disabled={isPending}
                  error={!!form.formState.errors.title}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="h-10">
          {isPending && <LoaderCircleIcon className="animate-spin" />}
          <span>Create Task List</span>
        </Button>
      </form>
    </Form>
  );
}
