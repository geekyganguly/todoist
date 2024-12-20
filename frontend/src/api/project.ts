import { AxiosRequestConfig } from "axios";
import { baseAxios } from "@/api/base";

export async function getProjectsApi(config?: AxiosRequestConfig) {
  return await baseAxios.get(`/projects`, config);
}

export async function createProjectApi(data: Record<string, unknown>) {
  return await baseAxios.post(`/projects`, data);
}

export async function getProjectApi(projectId: number) {
  return await baseAxios.get(`/projects/${projectId}`);
}

export async function updateProjectApi(
  projectId: number,
  data: Record<string, unknown>
) {
  return await baseAxios.put(`/projects/${projectId}`, data);
}

export async function deleteProjectApi(projectId: number) {
  return await baseAxios.delete(`/projects/${projectId}`);
}

export async function getProjectSharingApi(
  projectId: number,
  config?: AxiosRequestConfig
) {
  return await baseAxios.get(`/projects/${projectId}/share`, config);
}

export async function createProjectSharingApi(
  projectId: number,
  data: Record<string, unknown>
) {
  return await baseAxios.post(`/projects/${projectId}/share`, data);
}

export async function updateProjectSharingApi(
  projectId: number,
  userId: number,
  data: Record<string, unknown>
) {
  return await baseAxios.put(`/projects/${projectId}/share/${userId}`, data);
}

export async function deleteProjectSharingApi(
  projectId: number,
  userId: number
) {
  return await baseAxios.delete(`/projects/${projectId}/share/${userId}`);
}
