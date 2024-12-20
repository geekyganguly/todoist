import { PropsWithChildren } from "react";
import { Navigate } from "react-router";

import { useAuthInfo } from "@/hooks/auth";

export const URLs = Object.freeze({
  LOGIN_URL: "/login",
  LOGIN_REDIRECT_URL: "/",
  LOGOUT_REDIRECT_URL: "/",
});

export function AuthenticatedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthInfo();

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={`${URLs.LOGIN_URL}`} />;
  }
}

export function AnonymousRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthInfo();

  if (!isAuthenticated) {
    return children;
  } else {
    return <Navigate to={URLs.LOGIN_REDIRECT_URL} />;
  }
}
