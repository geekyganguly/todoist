import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

export function ModeToggle(props: ButtonProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      {...props}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
