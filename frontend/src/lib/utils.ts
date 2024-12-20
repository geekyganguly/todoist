import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cookies } from "react-cookie";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const cookies = new Cookies();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | dayjs.Dayjs) {
  return dayjs(date).fromNow();
}

export function getNameInitials(name: string) {
  const [fname, lname] = name.split(" ");

  const fInitial = fname ? fname.charAt(0).toUpperCase() : "";
  const lInitial = lname ? lname.charAt(0).toUpperCase() : "";

  // Return the initials
  return `${fInitial}${lInitial}`;
}

export function getCSRFToken() {
  return cookies.get("csrftoken");
}

export function getAuthToken() {
  return cookies.get("token");
}

export function setAuthToken(token: string) {
  cookies.set("token", token, { path: "/" });
}

export function removeAuthToken() {
  cookies.remove("token");
}
