import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "next-themes";
import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "@/routes";
import { queryClient } from "@/api/base";
import { AuthProvider } from "@/providers/auth";
import { TooltipProvider } from "@/components/ui/tooltip";

import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TooltipProvider delayDuration={400}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
