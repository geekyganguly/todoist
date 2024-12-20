import { User } from "@/types/auth";

export type Project = {
  id: number;
  user: User;
  title: string;
  is_owner: boolean;
  is_shared: boolean;
  is_editor: boolean;
  created_at: string;
  updated_at: string;
};

export type SharedProject = {
  id: number;
  user: User;
  project: Project;
  permission: string;
  created_at: string;
  updated_at: string;
};
