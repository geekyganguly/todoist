import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/types/task";

const taskSchema = z.object({
  title: z.string().trim().min(1, "Required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export function useTaskAddForm() {
  return useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
    },
  });
}

export function useTaskEditForm(task: Task) {
  return useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
    },
  });
}
