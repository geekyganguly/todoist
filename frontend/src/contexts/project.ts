import { createContext } from "react";
import { Project } from "@/types/project";

export interface ProjectContextType {
  project: Project | null;
  setProject: (project: Project | null) => void;

  shareProjectDialogOpen: boolean;
  setShareProjectDialogOpen: (value: boolean) => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  project: null,
  setProject: () => {},

  shareProjectDialogOpen: false,
  setShareProjectDialogOpen: () => {},
});
