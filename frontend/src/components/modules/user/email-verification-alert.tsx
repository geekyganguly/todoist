import { toast } from "sonner";
import { useState } from "react";
import { AlertCircle, LoaderCircle, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { useAuthInfo } from "@/hooks/auth";
import { useRequestEmailVerificationApi } from "@/api/mutation/auth";

export function EmailVerificationAlert() {
  const { user } = useAuthInfo();

  const [dismissed, setDismissed] = useState(false);
  const dismiss = () => setDismissed(true);

  const { mutateAsync: resend, isPending } = useRequestEmailVerificationApi();

  if (!user) return null;
  if (user.email_verified_at) return null;
  if (dismissed) return null;

  const onSubmit = () => {
    resend()
      .then(({ data }) => toast.success(data.message))
      .catch(() => toast.error("Failed to send verification email"));
  };

  return (
    <Alert variant="destructive" className="relative">
      <AlertCircle className="size-4" />
      <AlertTitle className="font-semibold">
        Email Verification Pending
      </AlertTitle>
      <AlertDescription className="text-sm">
        <p className="mb-2">
          Your email address has not been verified yet. Please check your inbox
          and spam folder for the verification email.
        </p>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="text-primary"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending && <LoaderCircle className="animate-spin" />}
            <span>Resend Verification Email</span>
          </Button>
        </div>
      </AlertDescription>

      <div className="absolute top-3 right-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary"
          onClick={dismiss}
        >
          <XIcon />
        </Button>
      </div>
    </Alert>
  );
}
