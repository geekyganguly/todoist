import { createBrowserRouter } from "react-router";

import { AnonymousRoute, AuthenticatedRoute } from "@/routes/auth";

import Root from "@/pages/root";
import ErrorPage from "@/pages/error";
import NotFoundPage from "@/pages/not-found";

// pages
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <AuthenticatedRoute>
            <HomePage />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AnonymousRoute>
            <LoginPage />
          </AnonymousRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AnonymousRoute>
            <RegisterPage />
          </AnonymousRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
