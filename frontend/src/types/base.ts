import { URLSearchParams } from "url";

export type QueryOpts = {
  enabled?: boolean;
  params?: URLSearchParams;
};

export type ApiError = {
  message: string;
  errors: { [key: string]: string[] };
};
