import { User } from "@/types/auth";

export type Project = {
  id: number;
  user: User;
  title: string;
  created_at: string;
  updated_at: string;
  is_shared: boolean;
  permissions: {
    can_update: boolean;
    can_delete: boolean;
    can_share: boolean;
    can_create_task: boolean;
  };
};

export type ProjectUser = User & {
  role: string;
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
};
