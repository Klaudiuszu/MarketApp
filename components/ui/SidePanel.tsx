"use client";

import { ReactNode } from "react";
import BlotterControlBar from "./blotter/BlotterControlBar";
import { ApiStatus } from "./blotter/constants";
import { Loader } from "./blotter/Loader";

interface SidePanelProps {
  title: string;
  status?: ApiStatus;
  data?: any[];
  children?: ReactNode;
  footerContent?: ReactNode;
  className?: string;
  loading?: boolean;
}

export default function SidePanel({
  title,
  status = ApiStatus.ONLINE,
  data = [],
  children,
  footerContent,
  className = "",
  loading = false,
}: SidePanelProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <aside
      className={`
        flex flex-col
        h-full
        min-h-0
        bg-gray-900
        border-r border-gray-700
        ${className}
      `}
    >
      <div className="shrink-0 border-b border-gray-700">
        <BlotterControlBar title={title} status={status} />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {loading ? (
          <Loader />
        ) : children ? (
          children
        ) : data.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-8">
            No issues
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {data.map((item, index) => (
              <div key={item.id ?? index} className="space-y-2">
                <div className="p-2 hover:bg-gray-800/50 rounded cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono text-blue-400">
                      {item.id}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        item.priority === "high"
                          ? "bg-red-900/30 text-red-300"
                          : item.priority === "medium"
                          ? "bg-yellow-900/30 text-yellow-300"
                          : "bg-green-900/30 text-green-300"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <h4 className="text-sm text-gray-200 font-medium mb-1">
                    {item.title}
                  </h4>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{item.assignee}</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>

                {index < data.length - 1 && (
                  <div className="h-px bg-gray-800" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="shrink-0 border-t border-gray-800 px-3 py-2">
        {footerContent ?? (
          <div className="text-xs text-gray-500 text-center">
            {data.length} issues • Trading Desk
          </div>
        )}
      </div>
    </aside>
  );
}
