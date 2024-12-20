import { Outlet } from "react-router";

import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/modules/header";

export default function Root() {
  return (
    <div className="min-h-dvh flex flex-col scroll-smooth">
      <Header />
      <Outlet />
      <Toaster richColors position="top-center" />
    </div>
  );
}
