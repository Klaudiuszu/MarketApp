"use client";

import { toastService } from "@/lib/toastService";

export const useSendData = () => {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const onSendData = async <T>(endpoint: string, data: T): Promise<void> => {
    try {
      const url = `${API_URL}${
        endpoint.startsWith("/") ? endpoint : "/" + endpoint
      }`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} – ${response.statusText}`);
      }

      toastService.success("Success", "Data has been submitted successfully");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toastService.error("Submission Error", errorMessage);
      throw err;
    }
  };

  return { onSendData };
};
