import { ApiStatus } from "@/components/ui/blotter/constants";
import { useCallback, useEffect, useState } from "react";
import { ZodSchema } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface UseFetchDataOptions<T> {
  endpoint: string;
  schema: ZodSchema<T[]>;
  initialData?: T[];
  enableDelay?: boolean;
  delayMs?: number;
  autoFetch?: boolean;
}

interface UseFetchDataReturn<T> {
  data: T[];
  status: ApiStatus;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<T[]>;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      const validatedData = schema.parse(jsonData);

      setData(validatedData);
      setStatus(ApiStatus.ONLINE);
      return validatedData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setStatus(ApiStatus.ERROR);
      setData([]);
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
