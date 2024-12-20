import { toast } from "sonner";
import { AxiosError } from "axios";
import { LoaderCircleIcon, SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordValidation } from "@/components/ui/password-validation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ApiError } from "@/types/base";
import { useChangePasswordDialog } from "@/hooks/auth";
import { useChangePasswordApi } from "@/api/mutation/auth";
import { ChangePasswordFormData, useChangePasswordForm } from "@/forms/auth";

export function ChangePassword() {
  const { isOpen, closeDialog } = useChangePasswordDialog();
  const { mutateAsync: changePassword, isPending } = useChangePasswordApi();

  const form = useChangePasswordForm();

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(data)
      .then(() => {
        closeDialog();
        form.reset();
        toast.success("Password changed successfully");
      })
      .catch((e: AxiosError) => {
        const error = e.response?.data as ApiError;

        if (error.errors) {
          Object.entries(error.errors).forEach(([key, errors]) => {
            errors.forEach((error) => {
              form.setError(key as keyof ChangePasswordFormData, {
                message: error,
              });
            });
          });
        }

        toast.error("Failed to change password");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new password to update your
            account security.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span>Current Password </span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        error={!!form.formState.errors.current_password}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span>New Password </span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <PasswordInput
                          error={!!form.formState.errors.new_password}
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
                name="new_password_confirmation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span>Confirm New Password </span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        error={
                          !!form.formState.errors.new_password_confirmation
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isPending} className="h-10">
              {isPending ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <SaveIcon />
              )}
              <span>Save</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
