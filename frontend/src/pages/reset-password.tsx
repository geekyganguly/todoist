import { useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordValidation } from "@/components/ui/password-validation";
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

import { useResetPasswordApi } from "@/api/mutation/auth";
import { useResetPasswordForm, ResetPasswordFormData } from "@/forms/auth";

export default function Page() {
  const navigate = useNavigate();

  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const form = useResetPasswordForm();
  const { mutateAsync: login, isPending } = useResetPasswordApi();

  const onSubmit = (data: ResetPasswordFormData) => {
    login(data)
      .then(() => navigate("/reset-password-done"))
      .catch(() => toast.error("Failed to reset password"));
  };

  useEffect(() => {
    if (token && email) {
      form.setValue("email", email);
      form.setValue("token", token);
    } else {
      navigate("/error");
    }
  }, [email, form, navigate, token]);

  return (
    <div className="flex-1 flex">
      <div className="container flex items-center justify-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Reset Password</CardTitle>
            <CardDescription className="text-sm">
              Enter your new password below.
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
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          <span>Password </span>
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <PasswordInput
                              error={!!form.formState.errors.password}
                              {...field}
                            />
                            <PasswordValidation password={field.value} />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          <span>Confirm Password </span>
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            error={
                              !!form.formState.errors.password_confirmation
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full space-x-2"
                  disabled={isPending}
                >
                  {isPending && <LoaderCircle className="animate-spin" />}
                  <span>Reset Password</span>
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
