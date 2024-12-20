import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-full flex-1 flex items-center justify-center",
        className
      )}
    >
      <LoaderCircle className="animate-spin size-14 text-primary" />
    </div>
  );
}
