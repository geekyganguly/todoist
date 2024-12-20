import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { LoaderCircleIcon, SaveIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useEditProfileApi } from "@/api/mutation/auth";
import { useAuthInfo, useEditProfileDialog } from "@/hooks/auth";
import { EditProfileFormData, useEditProfileForm } from "@/forms/auth";

export function EditProfile() {
  const { user } = useAuthInfo();
  const { isOpen, closeDialog } = useEditProfileDialog();
  const { mutateAsync: editProfile, isPending } = useEditProfileApi();

  const form = useEditProfileForm();

  const onSubmit = (data: EditProfileFormData) => {
    editProfile(data)
      .then(() => {
        closeDialog();
        form.reset();
        toast.success("Profile updated successfully");
        document.dispatchEvent(new CustomEvent("auth.change"));
      })
      .catch((e: AxiosError) => {
        const error = e.response?.data as ApiError;

        if (error.errors) {
          Object.entries(error.errors).forEach(([key, errors]) => {
            errors.forEach((error) => {
              form.setError(key as keyof EditProfileFormData, {
                message: error,
              });
            });
          });
        }

        toast.error("Failed to update profile");
      });
  };

  useEffect(() => {
    if (!user) return;

    form.setValue("name", user.name);
    form.setValue("email", user.email);
    form.setValue("username", user.username);
  }, [form, user]);

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
