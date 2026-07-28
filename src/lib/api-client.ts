import axios from "axios";
import { getTokenCookie, removeTokenCookie } from "./cookies";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const UNAUTHORIZED_EVENT = "rentnest:unauthorized";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getTokenCookie();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeTokenCookie();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
      }
    }

    return Promise.reject(error);
  },
);
