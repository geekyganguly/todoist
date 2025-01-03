import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

import { getAuthToken, removeAuthToken } from "@/lib/utils";

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const queryClient = new QueryClient();

baseAxios.interceptors.request.use(
  (config) => {
    if (getAuthToken()) {
      config.headers["Authorization"] = `Bearer ${getAuthToken()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => {
    // on success response
    return response;
  },
  (error) => {
    // on error response
    if (error.response && error.response.status === 401) {
      if (getAuthToken()) {
        removeAuthToken();
      }
    }

    return Promise.reject(error);
  }
);

export { baseAxios, queryClient };
