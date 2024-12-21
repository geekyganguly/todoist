import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Option } from "@/components/ui/multiple-selector";
import { Project } from "@/types/project";

const projectSchema = z.object({
  title: z.string().trim().min(1, "Required"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export function useProjectForm(project?: Project) {
  return useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
    },
  });
}

export type ProjectShareFormData = {
  users: Option[];
  permission: string;
};

export function useProjectShareForm() {
  return useForm<ProjectShareFormData>({
    defaultValues: {
      users: [],
      permission: "viewer",
    },
  });
}
