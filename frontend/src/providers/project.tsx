import { PropsWithChildren, useState } from "react";

// import { ProjectShare } from "@/components/modules/task-list/task-list-share";

import { ProjectContext } from "@/contexts/project";
import { Project } from "@/types/project";

export function ProjectProvider({ children }: PropsWithChildren) {
  const [project, setProject] = useState<Project | null>(null);

  const [shareProjectDialogOpen, setShareProjectDialogOpen] = useState(false);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,

        shareProjectDialogOpen,
        setShareProjectDialogOpen,
      }}
    >
      {children}

      {/* <ProjectShare /> */}
    </ProjectContext.Provider>
  );
}
