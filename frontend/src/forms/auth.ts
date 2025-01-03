import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkStrength } from "@/components/ui/password-validation";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Required").email(),
  password: z.string().trim().min(1, "Required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Required."),
    email: z.string().trim().min(1, "Required.").email(),
    username: z.string().trim().min(1, "Required."),
    password: z.string().trim().min(1, "Required."),
    password_confirmation: z.string().trim().min(1, "Required."),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["password_confirmation"],
      });
    }

    if (password) {
      const strength = checkStrength(password);
      const strengthScore = strength.filter((req) => req.met).length;
      if (strengthScore < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "",
          path: ["password"],
        });
      }
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
  });
};

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Required").email(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const useForgotPasswordForm = () => {
  return useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
};

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, "Required."),
    email: z.string().trim().min(1, "Required").email(),
    password: z.string().trim().min(1, "Required."),
    password_confirmation: z.string().trim().min(1, "Required."),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["password_confirmation"],
      });
    }

    if (password) {
      const strength = checkStrength(password);
      const strengthScore = strength.filter((req) => req.met).length;
      if (strengthScore < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "",
          path: ["password"],
        });
      }
    }
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordForm = () => {
  return useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
};

export const editProfileSchema = z.object({
  name: z.string().trim().min(1, "Required."),
  email: z.string().trim().min(1, "Required.").email(),
  username: z.string().trim().min(1, "Required."),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export const useEditProfileForm = () => {
  return useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
    },
  });
};

export const changePasswordSchema = z
  .object({
    current_password: z.string().trim().min(1, "Required."),
    new_password: z.string().trim().min(1, "Required."),
    new_password_confirmation: z.string().trim().min(1, "Required."),
  })
  .superRefine(({ new_password, new_password_confirmation }, ctx) => {
    if (new_password !== new_password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["new_password_confirmation"],
      });
    }

    if (new_password) {
      const strength = checkStrength(new_password);
      const strengthScore = strength.filter((req) => req.met).length;
      if (strengthScore < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "",
          path: ["new_password"],
        });
      }
    }
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const useChangePasswordForm = () => {
  return useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });
};
