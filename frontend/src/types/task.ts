export type Task = {
  id: number;
  project_id: number;
  title: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
};
