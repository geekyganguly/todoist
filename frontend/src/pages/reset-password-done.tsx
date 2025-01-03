import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex-1 flex">
      <div className="container flex items-center justify-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Password Reset Successful</CardTitle>
            <CardDescription className="text-sm">
              Your password has been successfully reset.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0 space-y-8">
            <p>You can now log in with your new password.</p>

            <Button asChild className="w-full">
              <Link to="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
