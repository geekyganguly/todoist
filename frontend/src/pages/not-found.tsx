import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex-1 flex bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          404 - Page Not Found
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
