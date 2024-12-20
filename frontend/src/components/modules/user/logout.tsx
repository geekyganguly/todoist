import { toast } from "sonner";
import { LoaderCircleIcon, LogOutIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { removeAuthToken } from "@/lib/utils";
import { useLogoutApi } from "@/api/mutation/auth";
import { useLogoutDialog } from "@/hooks/auth";

export function Logout() {
  const { isOpen, closeDialog } = useLogoutDialog();
  const { mutateAsync: logout, isPending } = useLogoutApi();

  const handleLogout = () => {
    logout()
      .finally(() => {
        removeAuthToken();
        document.dispatchEvent(new CustomEvent("auth.change"));
      })
      .catch(() => toast.error("Failed to logout"));
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will log you out of your account. You'll need to log in
            again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleLogout}>
            {isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <LogOutIcon />
            )}
            <span>Logout</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
