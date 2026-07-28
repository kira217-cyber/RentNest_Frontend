import { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/api";

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.message) {
      return data.message;
    }

    if (error.code === "ERR_NETWORK") {
      return "Unable to reach the server. Please check your connection.";
    }

    return FALLBACK_MESSAGE;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return FALLBACK_MESSAGE;
}

export function getApiErrorDetails(error: unknown) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    return data?.errorDetails ?? [];
  }

  return [];
}

export function getApiErrorStatus(error: unknown): number | undefined {
  if (error instanceof AxiosError) {
    return error.response?.status;
  }

  return undefined;
}
