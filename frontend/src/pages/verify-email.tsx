import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useVerifyEmailApi } from "@/api/mutation/auth";

export default function Page() {
  const { id, hash } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: verifyEmail, isPending } = useVerifyEmailApi();

  const onSubmit = () => {
    verifyEmail({ id, hash })
      .then(({ data }) => {
        navigate("/");
        toast.success(data.message);
        document.dispatchEvent(new CustomEvent("auth.change"));
      })
      .catch(() => toast.error("Failed to verify email"));
  };

  return (
    <div className="flex-1 flex">
      <div className="container flex items-center justify-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Verify Your Email</CardTitle>
            <CardDescription className="text-sm">
              Click the button below to verify your email address
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0 space-y-4">
            <Button className="w-full" onClick={onSubmit} disabled={isPending}>
              {isPending && <LoaderCircle className="animate-spin" />}
              <span>{isPending ? "Verifying..." : "Verify Email"}</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
