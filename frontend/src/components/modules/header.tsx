import { Link } from "react-router";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { ProfileMenu } from "@/components/modules/user/profile-menu";

export function Header() {
  return (
    <header className="sticky top-0 bg-background border-b shadow">
      <div className="container mx-auto py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold select-none">todoist</h1>
        </Link>

        <div className="flex items-center space-x-2">
          <ModeToggle variant="ghost" size="icon" className="rounded-full" />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
