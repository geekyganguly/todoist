import { AxiosRequestConfig } from "axios";
import { baseAxios } from "@/api/base";

export async function getTasksApi(
  projectId: number,
  config?: AxiosRequestConfig
) {
  return await baseAxios.get(`/projects/${projectId}/tasks`, config);
}

export async function createTaskApi(
  projectId: number,
  data: Record<string, unknown>
) {
  return await baseAxios.post(`/projects/${projectId}/tasks`, data);
}

export async function getTaskApi(projectId: number, taskId: number) {
  return await baseAxios.get(`/projects/${projectId}/tasks/${taskId}`);
}

export async function updateTaskApi(
  projectId: number,
  taskId: number,
  data: Record<string, unknown>
) {
  return await baseAxios.put(`/projects/${projectId}/tasks/${taskId}`, data);
}

export async function deleteTaskApi(projectId: number, taskId: number) {
  return await baseAxios.delete(`/projects/${projectId}/tasks/${taskId}`);
}
