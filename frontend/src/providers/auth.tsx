import { useEffect, PropsWithChildren, useState } from "react";

import { Loader } from "@/components/ui/loader";
import { EditProfile } from "@/components/modules/user/edit-profile";
import { ChangePassword } from "@/components/modules/user/change-password";
import { Logout } from "@/components/modules/user/logout";

import { AuthContext } from "@/contexts/auth";
import { getProfileApi } from "@/api/auth";
import { User } from "@/types/auth";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    const onAuthChanged = () => {
      getProfileApi()
        .then(({ data: { data } }) => setUser(data))
        .catch(() => setUser(null));
    };

    document.addEventListener("auth.change", onAuthChanged);

    getProfileApi()
      .then(({ data: { data } }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoaded(true));

    return () => {
      document.removeEventListener("auth.change", onAuthChanged);
    };
  }, []);

  const isLoading = !isLoaded;

  return (
    <AuthContext.Provider
      value={{
        user,
        editProfileDialogOpen,
        setEditProfileDialogOpen,
        changePasswordDialogOpen,
        setChangePasswordDialogOpen,
        logoutDialogOpen,
        setLogoutDialogOpen,
      }}
    >
      {isLoading ? <Loader className="min-h-svh" /> : children}

      <EditProfile />
      <ChangePassword />
      <Logout />
    </AuthContext.Provider>
  );
}
