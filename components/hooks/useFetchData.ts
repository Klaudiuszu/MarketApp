import { useCallback, useEffect, useState } from "react";
import { ZodError } from "zod";
import { ApiStatus } from "../../components/ui/blotter/constants";
import { toastService } from "../../lib/toastService";
import { UseFetchDataOptions, UseFetchDataReturn } from "../../types/global";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://market-h3rcsfpks-arksoftwares-projects.vercel.app";

export function useFetchData<T>({
  endpoint,
  schema,
  initialData = [],
  enableDelay = false,
  delayMs = 3000,
  autoFetch = true,
}: UseFetchDataOptions<T>): UseFetchDataReturn<T> {
  const [data, setData] = useState<T[]>(initialData);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.UNKNOWN);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<T[]> => {
    try {
      setLoading(true);
      setStatus(ApiStatus.PENDING);
      setError(null);

      const delayPromise = enableDelay
        ? new Promise((resolve) => setTimeout(resolve, delayMs))
        : Promise.resolve();

      const fetchPromise = fetch(`${API_URL}${endpoint}`);

      const [_, response] = await Promise.all([delayPromise, fetchPromise]);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} – ${response.statusText}`);
      }

      const jsonData = await response.json();
      const validatedData = schema.parse(jsonData);

      setData(validatedData);
      setStatus(ApiStatus.ONLINE);

      if (validatedData.length === 0) {
        setStatus(ApiStatus.ONLINE);
      }

      return validatedData;
    } catch (err) {
      let message = "Unknown error occurred";

      if (err instanceof ZodError) {
        message = "API response schema mismatch";
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      setStatus(ApiStatus.ERROR);
      setData([]);

      toastService.error("Data fetch error", `${endpoint}: ${message}`);

      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, schema, enableDelay, delayMs]);

  useEffect(() => {
    if (autoFetch) {
      fetchData().catch(() => {});
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    status,
    loading,
    error,
    fetchData,
    setData,
  };
}
