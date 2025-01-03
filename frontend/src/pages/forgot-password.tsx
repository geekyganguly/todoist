import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForgotPasswordForm, ForgotPasswordFormData } from "@/forms/auth";
import { useForgotPasswordApi } from "@/api/mutation/auth";

export default function Page() {
  const navigate = useNavigate();
  const form = useForgotPasswordForm();
  const { mutateAsync: login, isPending } = useForgotPasswordApi();

  const onSubmit = (data: ForgotPasswordFormData) => {
    login(data)
      .then(() => navigate("/forgot-password-sent"))
      .catch(() => toast.error("Failed to send password reset link"));
  };

  return (
    <div className="flex-1 flex">
      <div className="container flex items-center justify-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Forgot Password</CardTitle>
            <CardDescription className="text-sm">
              Enter your email to receive a password reset link.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          <span>Email Address </span>
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            error={!!form.formState.errors.email}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && <LoaderCircle className="animate-spin" />}
                  <span>Send Reset Link</span>
                </Button>

                <div className="space-y-1">
                  <div className="flex items-center justify-center text-sm gap-x-1">
                    <span>Have password?</span>

                    <Button
                      asChild
                      variant="link"
                      className="h-0 px-0 font-semibold"
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
