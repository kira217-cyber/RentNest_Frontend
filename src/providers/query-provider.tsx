"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

function shouldRetry(failureCount: number, error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    // Don't retry client errors (400/401/403/404/409/422) — retrying won't
    // change the outcome and it only delays the error state from showing.
    if (status && status >= 400 && status < 500) {
      return false;
    }
  }

  return failureCount < 1;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
            retry: shouldRetry,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
