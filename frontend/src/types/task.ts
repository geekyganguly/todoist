import { Project } from "@/types/project";

export type Task = {
  id: number;
  project: Project;
  title: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};
