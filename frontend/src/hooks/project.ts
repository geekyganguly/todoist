import { useContext } from "react";

import { ProjectContext } from "@/contexts/project";
import { Project } from "@/types/project";

export function useProjectShareDialog() {
  const {
    project,
    setProject,
    shareProjectDialogOpen,
    setShareProjectDialogOpen,
  } = useContext(ProjectContext);

  const openDialog = (project: Project) => {
    setProject(project);
    setShareProjectDialogOpen(true);
  };

  const closeDialog = () => {
    setProject(null);
    setShareProjectDialogOpen(false);
  };

  return {
    project,
    isOpen: shareProjectDialogOpen,
    openDialog,
    closeDialog,
  };
}
