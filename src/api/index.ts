import axios, { Method } from "axios";
import { proxyUrl } from "../constants";

const apiInstance = axios.create({
  // Default in development but has to be configured differently in production
  baseURL: proxyUrl,
});

async function apiClientRequest<T>(method: Method, url: string, data: T) {
  try {
    const res = await apiInstance({
      method,
      url,
      data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

function get<T>(url: string, data: T) {
  return apiClientRequest("get", url, data);
}

function deleteRequest<T>(url: string, data: T) {
  return apiClientRequest("delete", url, data);
}

function post<T>(url: string, data: T) {
  return apiClientRequest("post", url, data);
}

function put<T>(url: string, data: T) {
  return apiClientRequest("put", url, data);
}

function patch<T>(url: string, data: T) {
  return apiClientRequest("patch", url, data);
}

const apiClient = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
};
export default apiClient;
