import { Link, useRouteError } from "react-router";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return (
      <pre className="p-4 rounded-md overflow-x-auto">
        <code className="text-sm">{error.stack}</code>
      </pre>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="text-xl mb-8">
        We're sorry, but an error occurred while processing your request.
      </p>

      <div className="flex space-x-4">
        <Button asChild variant="outline">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
