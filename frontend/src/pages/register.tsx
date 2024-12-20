import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordValidation } from "@/components/ui/password-validation";
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
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div className="flex-1 flex">
      <div className="container flex items-center justify-center">
        <Card className="w-full max-w-md rounded-xl shadow-lg p-8 space-y-8">
          <div className="text-start">
            <h2 className="text-2xl font-semibold tracking-tight">Sign up</h2>
            <p className="text-sm text-muted-foreground">
              Please enter your details.
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                          error={!!form.formState.errors.password_confirmation}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing up..." : "Sign up"}
              </Button>

              <div className="text-center text-sm">
                <span>Already have an account? </span>
                <Button
                  type="button"
                  variant="link"
                  className="px-1 font-semibold"
                  disabled={isPending}
                >
                  <Link to="/login" className="text-primary hover:underline">
                    Login
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
