import { ProjectAdd } from "@/components/modules/project/project-add";
import { ProjectList } from "@/components/modules/project/project-list";
import { EmailVerificationAlert } from "@/components/modules/user/email-verification-alert";

export default function Page() {
  return (
    <div className="container flex-1 py-6 space-y-4">
      <EmailVerificationAlert />
      <ProjectAdd />
      <ProjectList />
    </div>
  );
}
