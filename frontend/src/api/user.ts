import { AxiosRequestConfig } from "axios";
import { baseAxios } from "@/api/base";

export async function searchUsersApi(
  query: string,
  config?: AxiosRequestConfig
) {
  return await baseAxios.get(`/users/search/${query}`, config);
}
