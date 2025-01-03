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
            <CardTitle className="text-xl">Reset Password Link Sent</CardTitle>
            <CardDescription className="text-sm">
              A password reset link has been sent to your email.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0 space-y-8">
            <p>
              Please check your inbox and follow the instructions to reset your
              password.
            </p>

            <Button asChild className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
