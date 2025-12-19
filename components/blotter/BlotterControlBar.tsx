"use client";

import { ApiStatus } from "./constants";

type BlotterControlBarProps = {
  title?: string;
  status?: ApiStatus;
  className?: string;
  children?: React.ReactNode;
};

export default function BlotterControlBar({
  title = "Blotter",
  status = ApiStatus.UNKNOWN,
  className = "",
  children,
}: BlotterControlBarProps) {
  const statusColor =
    status === ApiStatus.ONLINE
      ? "bg-green-400"
      : status === ApiStatus.OFFLINE
      ? "bg-red-500"
      : status === ApiStatus.PENDING
      ? "bg-blue-400"
      : "bg-gray-500";

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 border-b border-gray-700/60 bg-gray-900 ${className}`}
      data-testid="blotter-control-bar"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span
              className={`inline-flex w-3 h-3 rounded-full ${statusColor}`}
              aria-hidden
            />
            {status === "online" && (
              <span className="absolute top-0 left-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
            )}
          </div>
        </div>
        <div className="h-4 w-px bg-gray-700" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-200">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
