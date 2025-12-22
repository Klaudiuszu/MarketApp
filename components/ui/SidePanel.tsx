"use client";

import { INewIssueType } from "@/lib/schemas/NewIssueSchema";
import { ReactNode } from "react";
import BlotterControlBar from "./blotter/BlotterControlBar";
import { ApiStatus } from "./blotter/constants";
import { Loader } from "./blotter/Loader";

interface SidePanelProps {
  title: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  status?: ApiStatus;
  data: INewIssueType[];
  children?: ReactNode;
  footerContent?: ReactNode;
  className?: string;
  loading?: boolean;
}

export default function SidePanel({
  title,
  selectedId,
  status = ApiStatus.ONLINE,
  data = [],
  children,
  footerContent,
  className = "",
  loading = false,
  onSelect,
}: SidePanelProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const handleSelect = (id: string) => {
    onSelect(selectedId === id ? null : id);
  };

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
                <div
                  role="button"
                  aria-pressed={selectedId === item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`
                    relative p-3 rounded cursor-pointer
                    transition-all duration-150
                    ${
                      selectedId === item.id
                        ? "bg-blue-900/50 border-l-4 border-blue-400 shadow-[inset_0_0_0_1px_rgba(96,165,250,0.4)]"
                        : "hover:bg-gray-800/60 border-l-4 border-transparent"
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={`text-xs font-mono ${
                        selectedId === item.id
                          ? "text-blue-300"
                          : "text-blue-400"
                      }`}
                    >
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

                  <h4
                    className={`text-sm font-medium mb-1 ${
                      selectedId === item.id ? "text-blue-200" : "text-gray-200"
                    }`}
                  >
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
