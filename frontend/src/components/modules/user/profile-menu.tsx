import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getNameInitials } from "@/lib/utils";
import {
  useAuthInfo,
  useChangePasswordDialog,
  useEditProfileDialog,
  useLogoutDialog,
} from "@/hooks/auth";

export function ProfileMenu() {
  const { user } = useAuthInfo();
  const { openDialog: openEditProfileDialog } = useEditProfileDialog();
  const { openDialog: openChangePasswordDialog } = useChangePasswordDialog();
  const { openDialog: openLogoutDialog } = useLogoutDialog();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary" className="rounded-full">
          {getNameInitials(user.name)}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" sideOffset={16} align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {user.name}
          </span>

          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={openEditProfileDialog}>
            Edit Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={openChangePasswordDialog}>
            Change Password
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={openLogoutDialog}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
