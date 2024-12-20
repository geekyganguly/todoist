import { ProjectAdd } from "@/components/modules/project/project-add";
import { ProjectList } from "@/components/modules/project/project-list";

import { ProjectProvider } from "@/providers/project";

export default function Page() {
  return (
    <div className="container flex-1 py-6 space-y-4">
      <ProjectProvider>
        <ProjectAdd />
        <ProjectList />
      </ProjectProvider>
    </div>
  );
}
