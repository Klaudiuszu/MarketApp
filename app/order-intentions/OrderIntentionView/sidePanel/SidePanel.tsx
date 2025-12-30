"use client";
import { ReactNode, useState } from "react";
import BlotterControlBar from "../../../../components/ui/blotter/BlotterControlBar";
import { ApiStatus } from "../../../../components/ui/blotter/constants";
import { Loader } from "../../../../components/ui/blotter/Loader";
import { BlotterDialog } from "../../../../components/ui/dialog/BlotterDialog";
import { INewIssueType } from "../../../../lib/schemas/NewIssueSchema";
import { tanColumns } from "../../dialogs/portfolioDialog/tanColumns";

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
  const [visible, setVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

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
      <div className="bg-gray-900 border border-gray-700 overflow-hidden flex flex-col">
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
                    border-l-4 min-h-[100px]
                    group
                    ${
                      selectedId === item.id
                        ? "bg-blue-900/20 border-blue-500 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]"
                        : "hover:bg-gray-800/60 border-transparent"
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-1 pr-16">
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
                    className={`text-sm font-medium mb-2 pr-16 ${
                      selectedId === item.id ? "text-blue-100" : "text-gray-200"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <div className="flex justify-between text-xs pr-16">
                    <span
                      className={
                        selectedId === item.id
                          ? "text-blue-300/70"
                          : "text-gray-500"
                      }
                    >
                      {item.assignee}
                    </span>
                    <span
                      className={
                        selectedId === item.id
                          ? "text-blue-300/70"
                          : "text-gray-500"
                      }
                    >
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  {selectedId === item.id && (
                    <div className="pt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setVisible(true);
                        }}
                        onMouseEnter={() => setHoveredButton(item.id)}
                        onMouseLeave={() => setHoveredButton(null)}
                        className={`
                          relative
                          px-3 py-1.5
                          text-xs font-medium
                          rounded
                          transition-all duration-300
                          whitespace-nowrap
                          cursor-pointer
                          overflow-hidden
                          ${
                            hoveredButton === item.id
                              ? "transform scale-[1.02]"
                              : ""
                          }
                        `}
                      >
                        <div
                          className={`
                            absolute inset-0
                            bg-linear-to-r from-blue-500/10 via-blue-500/20 to-blue-500/10
                            rounded
                            transition-opacity duration-300
                            ${
                              hoveredButton === item.id
                                ? "opacity-100"
                                : "opacity-0"
                            }
                          `}
                        />
                        <div
                          className={`
                            relative z-10
                            flex items-center justify-center gap-1.5
                          `}
                        >
                          <span
                            className={`
                              transition-all duration-300
                              ${
                                hoveredButton === item.id
                                  ? "text-blue-100"
                                  : "text-blue-300"
                              }
                            `}
                          >
                            Create Order
                          </span>
                          <svg
                            className={`
                              w-3.5 h-3.5
                              transition-all duration-300
                              ${
                                hoveredButton === item.id
                                  ? "text-blue-200 transform translate-x-0.5"
                                  : "text-blue-300/70"
                              }
                            `}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                        <div
                          className={`
                            absolute inset-0
                            border rounded
                            transition-all duration-300
                            ${
                              hoveredButton === item.id
                                ? "border-blue-400/60"
                                : "border-blue-400/30"
                            }
                          `}
                        />
                        <div
                          className={`
                            absolute inset-0
                            bg-linear-to-r from-transparent via-blue-400/10 to-transparent
                            -translate-x-full
                            rounded
                            transition-transform duration-700
                            ${
                              hoveredButton === item.id
                                ? "translate-x-full"
                                : ""
                            }
                          `}
                        />
                      </button>
                    </div>
                  )}
                </div>

                {index < data.length - 1 && (
                  <div className="h-px bg-gray-800" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 border-b border-gray-800 px-3 py-2">
        {footerContent ?? (
          <div className="text-xs text-gray-500 text-center">
            {data.length} issues • Trading Desk
          </div>
        )}
      </div>
      <BlotterDialog
        visible={visible}
        title="Select Portfolio & Carve-out"
        columns={tanColumns}
        data={[]}
        onDiscard={() => setVisible(false)}
        onContinue={() => {
          setVisible(false);
        }}
      />
    </aside>
  );
}
