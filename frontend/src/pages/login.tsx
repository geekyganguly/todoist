import { Link } from "react-router";
import { AlertTriangleIcon, LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
        <Card className="w-full max-w-md rounded-xl shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription className="text-sm">
              Please enter your details to sign in.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                  {isPending && <LoaderCircle className="animate-spin" />}
                  <span>{isPending ? "Signing in..." : "Sign in"}</span>
                </Button>

                <div className="space-y-2">
                  <div className="flex items-center justify-center text-sm gap-x-1">
                    <span>Don't have an account yet?</span>

                    <Button
                      asChild
                      variant="link"
                      className="h-0 px-0 font-semibold"
                    >
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-center text-sm gap-x-1">
                    <span>Forgot password?</span>

                    <Button
                      asChild
                      variant="link"
                      className="h-0 px-0 font-semibold"
                    >
                      <Link to="/forgot-password">Reset Password</Link>
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
