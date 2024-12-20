import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Option } from "@/components/ui/multiple-selector";

const projectAddSchema = z.object({
  title: z.string().trim().min(1, "Required"),
});

export type ProjectAddFormData = z.infer<typeof projectAddSchema>;

export function useProjectAddForm() {
  return useForm<ProjectAddFormData>({
    resolver: zodResolver(projectAddSchema),
    defaultValues: {
      title: "",
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
