import { toast } from "sonner";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
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

import { useRegisterApi } from "@/api/mutation/auth";
import { RegisterFormData, useRegisterForm } from "@/forms/auth";
import { ApiError } from "@/types/base";

export default function Page() {
  const navigate = useNavigate();
  const form = useRegisterForm();

  const { mutateAsync: register, isPending } = useRegisterApi();

  const onSubmit = (data: RegisterFormData) => {
    register(data)
      .then(() => {
        toast.success("Registered Successfully");
        navigate("/login");
      })
      .catch((e: AxiosError) => {
        const { message } = e.response?.data as ApiError;
        toast.error(message || "Something went wrong!");
      });
  };

  return (
    <div className="flex-1 flex">
      <div className="container flex items-center justify-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Sign up</CardTitle>
            <CardDescription className="text-sm">
              Please enter your details.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <span>Full Name </span>
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              required
                              error={!!form.formState.errors.name}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            <span>Username </span>
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              required
                              error={!!form.formState.errors.username}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                            required
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
                          <div className="space-y-3">
                            <PasswordInput
                              error={!!form.formState.errors.password}
                              {...field}
                            />
                            <PasswordValidation password={field.value} />
                          </div>
                        </FormControl>
                        <FormMessage />
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

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && <LoaderCircle className="animate-spin" />}
                  {isPending ? "Signing up..." : "Sign up"}
                </Button>

                <div className="flex items-center justify-center text-sm gap-x-1">
                  <span>Already have an account?</span>

                  <Button
                    asChild
                    variant="link"
                    className="h-0 px-0 font-semibold"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
