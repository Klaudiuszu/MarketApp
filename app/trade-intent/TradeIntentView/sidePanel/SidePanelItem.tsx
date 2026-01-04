"use client";

import { INewIssueType } from "../../../../lib/schemas/NewIssueSchema";
import { formatDate } from "./utils";

interface Props {
  item: INewIssueType;
  selected: boolean;
  onSelect: () => void;
  onCreateOrder: () => void;
  hovered: boolean;
  onHover: (value: boolean) => void;
}

const priorityClasses: Record<INewIssueType["priority"], string> = {
  high: "bg-red-900/30 text-red-300",
  medium: "bg-yellow-900/30 text-yellow-300",
  low: "bg-green-900/30 text-green-300",
  critical: "",
};

export const SidePanelItem = ({
  item,
  selected,
  onSelect,
  onCreateOrder,
  hovered,
  onHover,
}: Props) => {
  return (
    <div
      role="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`
        relative p-3 rounded cursor-pointer
        transition-all duration-150
        border-l-4 min-h-[100px]
        group
        ${
          selected
            ? "bg-blue-900/20 border-blue-500 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]"
            : "hover:bg-gray-800/60 border-transparent"
        }
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <span
          className={`text-xs font-mono ${
            selected ? "text-blue-300" : "text-blue-400"
          }`}
        >
          {item.id}
        </span>
        <span
          className={`text-xs px-1.5 py-0.5 rounded ${
            priorityClasses[item.priority]
          }`}
        >
          {item.priority}
        </span>
      </div>
      <h4
        className={`text-sm font-medium mb-2 ${
          selected ? "text-blue-100" : "text-gray-200"
        }`}
      >
        {item.title}
      </h4>
      <div className="flex justify-between text-xs">
        <span className={selected ? "text-blue-300/70" : "text-gray-500"}>
          {item.assignee}
        </span>
        <span className={selected ? "text-blue-300/70" : "text-gray-500"}>
          {formatDate(item.createdAt)}
        </span>
      </div>
      {selected && (
        <div className="pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCreateOrder();
            }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className={`
              relative px-3 py-1.5 text-xs font-medium rounded
              transition-all duration-300 whitespace-nowrap
              ${
                hovered
                  ? "text-blue-100 border-blue-400/60"
                  : "text-blue-300 border-blue-400/30"
              }
              border
            `}
          >
            Create Order →
          </button>
        </div>
      )}
    </div>
  );
};
