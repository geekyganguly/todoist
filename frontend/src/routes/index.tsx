import { createBrowserRouter } from "react-router";

import { AnonymousRoute, AuthenticatedRoute } from "@/routes/auth";

import Root from "@/pages/root";
import ErrorPage from "@/pages/error";
import NotFoundPage from "@/pages/not-found";

// pages
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import ForgotPasswordSentPage from "@/pages/forgot-password-sent";
import RestPasswordPage from "@/pages/reset-password";
import RestPasswordDonePage from "@/pages/reset-password-done";
import VerifyEmailPage from "@/pages/verify-email";

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
      {
        path: "forgot-password",
        element: (
          <AnonymousRoute>
            <ForgotPasswordPage />
          </AnonymousRoute>
        ),
      },
      {
        path: "forgot-password-sent",
        element: (
          <AnonymousRoute>
            <ForgotPasswordSentPage />
          </AnonymousRoute>
        ),
      },
      {
        path: "reset-password/:token",
        element: (
          <AnonymousRoute>
            <RestPasswordPage />
          </AnonymousRoute>
        ),
      },
      {
        path: "reset-password-done",
        element: (
          <AnonymousRoute>
            <RestPasswordDonePage />
          </AnonymousRoute>
        ),
      },
      {
        path: "email/verify/:id/:hash",
        element: (
          <AuthenticatedRoute>
            <VerifyEmailPage />
          </AuthenticatedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
