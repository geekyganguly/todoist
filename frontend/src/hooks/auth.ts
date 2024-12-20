import { useContext } from "react";

import { AuthContext } from "@/contexts/auth";

export function useAuthInfo() {
  const user = useContext(AuthContext).user;

  return {
    user,
    isAuthenticated: !!user,
  };
}

export function useEditProfileDialog() {
  const { editProfileDialogOpen, setEditProfileDialogOpen } =
    useContext(AuthContext);

  const openDialog = () => {
    setEditProfileDialogOpen(true);
  };

  const closeDialog = () => {
    setEditProfileDialogOpen(false);
  };

  return {
    isOpen: editProfileDialogOpen,
    openDialog,
    closeDialog,
  };
}

export function useChangePasswordDialog() {
  const { changePasswordDialogOpen, setChangePasswordDialogOpen } =
    useContext(AuthContext);

  const openDialog = () => {
    setChangePasswordDialogOpen(true);
  };

  const closeDialog = () => {
    setChangePasswordDialogOpen(false);
  };

  return {
    isOpen: changePasswordDialogOpen,
    openDialog,
    closeDialog,
  };
}

export function useLogoutDialog() {
  const { logoutDialogOpen, setLogoutDialogOpen } = useContext(AuthContext);

  const openDialog = () => {
    setLogoutDialogOpen(true);
  };

  const closeDialog = () => {
    setLogoutDialogOpen(false);
  };

  return {
    isOpen: logoutDialogOpen,
    openDialog,
    closeDialog,
  };
}
