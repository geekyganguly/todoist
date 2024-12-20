import { createContext } from "react";
import { User } from "@/types/auth";

export interface AuthContextType {
  user: User | null;

  editProfileDialogOpen: boolean;
  setEditProfileDialogOpen: (open: boolean) => void;

  changePasswordDialogOpen: boolean;
  setChangePasswordDialogOpen: (open: boolean) => void;

  logoutDialogOpen: boolean;
  setLogoutDialogOpen: (open: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,

  editProfileDialogOpen: false,
  setEditProfileDialogOpen: () => {},

  changePasswordDialogOpen: false,
  setChangePasswordDialogOpen: () => {},

  logoutDialogOpen: false,
  setLogoutDialogOpen: () => {},
});
