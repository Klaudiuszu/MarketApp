"use client";

import { ApiStatus } from "./constants";

interface StatusIndicatorProps {
  status: ApiStatus | string;
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({ status, size = "sm" }: StatusIndicatorProps) {
  const getStatusColor = (status: ApiStatus | string): string => {
    const statusStr = String(status).toLowerCase();

    if (statusStr === ApiStatus.ONLINE) return "bg-green-500";
    if (statusStr === ApiStatus.OFFLINE) return "bg-red-500";
    if (statusStr === ApiStatus.PENDING) return "bg-blue-500";
    if (statusStr === ApiStatus.ERROR) return "bg-yellow-500";
    if (statusStr === ApiStatus.UNKNOWN) return "bg-gray-500";
    return "bg-gray-500";
  };

  const statusColor = getStatusColor(status);

  return (
    <span
      className={`inline-flex rounded-full ${statusColor} w-3 h-3`}
      aria-hidden
      data-testid="status-indicator"
    />
  );
}
