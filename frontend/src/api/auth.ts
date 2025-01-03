import { baseAxios } from "@/api/base";

const URLs = Object.freeze({
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  CHANGE_PASSWORD: "/change-password",
  LOGOUT: "/logout",
  PROFILE: "/me",
});

export async function loginApi(data: Record<string, unknown>) {
  return await baseAxios.post(URLs.LOGIN, data);
}

export async function registerApi(data: Record<string, unknown>) {
  return await baseAxios.post(URLs.REGISTER, data);
}

export async function forgotPasswordApi(data: Record<string, unknown>) {
  return await baseAxios.post(URLs.FORGOT_PASSWORD, data);
}

export async function resetPasswordApi(data: Record<string, unknown>) {
  return await baseAxios.post(URLs.RESET_PASSWORD, data);
}

export async function getProfileApi() {
  return await baseAxios.get(URLs.PROFILE);
}

export async function updateProfileApi(data: Record<string, unknown>) {
  return await baseAxios.put(URLs.PROFILE, data);
}

export async function changePasswordApi(data: Record<string, unknown>) {
  return await baseAxios.post(URLs.CHANGE_PASSWORD, data);
}

export async function logoutApi() {
  return await baseAxios.delete(URLs.LOGOUT);
}
