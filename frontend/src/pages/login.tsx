import { Link } from "react-router";
import { AlertTriangleIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { setAuthToken } from "@/lib/utils";
import { useLoginApi } from "@/api/mutation/auth";
import { LoginFormData, useLoginForm } from "@/forms/auth";

export default function Page() {
  const form = useLoginForm();
  const { mutateAsync: login, isError, isPending } = useLoginApi();

  const onSubmit = (data: LoginFormData) => {
    login(data).then(({ data }) => {
      setAuthToken(data.data.token);
      document.dispatchEvent(new CustomEvent("auth.change"));
    });
  };

  return (
    <div className="flex-1 flex">
      <div className="container flex items-center justify-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg p-8 space-y-8">
          <div className="text-start">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">
              Please enter your details to sign in.
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {isError && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="size-4" />
                  <AlertDescription className="text-sm">
                    The email address and/or password you specified are not
                    correct.
                  </AlertDescription>
                </Alert>
              )}

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
                        <PasswordInput
                          error={!!form.formState.errors.password}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center text-sm">
                <span>Don't have an account yet? </span>
                <Button
                  type="button"
                  variant="link"
                  className="px-1 font-semibold"
                  disabled={isPending}
                >
                  <Link to="/register" className="text-primary hover:underline">
                    Register
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
