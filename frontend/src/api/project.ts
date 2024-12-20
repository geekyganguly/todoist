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
  return await baseAxios.get(`/projects/${projectId}/sharing`, config);
}

export async function createProjectSharingApi(
  projectId: number,
  data: Record<string, unknown>
) {
  return await baseAxios.post(`/projects/${projectId}/sharing`, data);
}

export async function updateProjectSharingApi(
  projectId: number,
  sharingId: number,
  data: Record<string, unknown>
) {
  return await baseAxios.put(
    `/projects/${projectId}/sharing/${sharingId}`,
    data
  );
}

export async function deleteProjectSharingApi(
  projectId: number,
  sharingId: number
) {
  return await baseAxios.delete(`/projects/${projectId}/sharing/${sharingId}`);
}
