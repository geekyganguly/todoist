import { useMutation } from "@tanstack/react-query";
import {
  loginApi,
  logoutApi,
  registerApi,
  forgotPasswordApi,
  resetPasswordApi,
  changePasswordApi,
  updateProfileApi,
} from "@/api/auth";

export function useLoginApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return loginApi(data);
    },
  });
}

export function useRegisterApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return registerApi(data);
    },
  });
}

export function useForgotPasswordApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return forgotPasswordApi(data);
    },
  });
}

export function useResetPasswordApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return resetPasswordApi(data);
    },
  });
}

export function useEditProfileApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return updateProfileApi(data);
    },
  });
}

export function useChangePasswordApi() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return changePasswordApi(data);
    },
  });
}

export function useLogoutApi() {
  return useMutation({
    mutationFn: () => {
      return logoutApi();
    },
  });
}
