"use client";

import type { Column } from "@tanstack/react-table";
import { useState } from "react";
import { DateRangeFilter } from "../filters/DateRangeFilter";

interface DateFilterValue {
  start: string;
  end: string;
}

type ColumnFilterInputProps<
  TData = Record<string, unknown>,
  TValue = unknown,
> = {
  column: Column<TData, TValue>;
};
/**
 * ColumnFilterInput - Input component for filtering table columns
 * Automatically hides if column doesn't support filtering
 */
export default function ColumnFilterInput<
  TData = Record<string, unknown>,
  TValue = unknown,
>({ column }: ColumnFilterInputProps<TData, TValue>) {
  if (!column.getCanFilter()) return null;

  const [showDateFilter, setShowDateFilter] = useState(false);
  const isDateColumn = column.id === "createdAt";
  const filterValue = column.getFilterValue();
  const hasFilter =
    filterValue !== undefined && filterValue !== null && filterValue !== "";

  if (isDateColumn) {
    const isDateFilterActive: boolean =
      (filterValue &&
        typeof filterValue === "object" &&
        ((filterValue as DateFilterValue)?.start ||
          (filterValue as DateFilterValue)?.end)) as boolean;

    return (
      <div className="w-full relative">
        <div className="flex items-center h-6">
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className={`w-full h-6 px-1 text-left text-[10px] border bg-gray-700 border-gray-600 text-gray-400 hover:text-gray-200 flex items-center gap-1 ${
              isDateFilterActive ? "border-blue-500/50 text-blue-300" : ""
            }`}
          >
            {isDateFilterActive ? (
              <div className="w-1 h-1 bg-blue-500 rounded-full mr-0.5"></div>
            ) : null}
            <span className="pi pi-calendar text-[10px]"></span>
            <span className="truncate">
              {isDateFilterActive ? "date filter" : "date..."}
            </span>
          </button>

          {isDateFilterActive ? (
            <button
              onClick={() => column.setFilterValue(undefined)}
              className="ml-1 text-gray-400 hover:text-gray-200 text-[10px] h-6 px-1"
              title="Clear filter"
            >
              ✕
            </button>
          ) : null}
        </div>

        {showDateFilter && (
          <div className="absolute top-full left-0 z-50 mt-1">
            <DateRangeFilter
              column={column}
              onFilter={(value: DateFilterValue | null) => {
                column.setFilterValue(value);
                setShowDateFilter(false);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  const value = String(filterValue ?? "");

  return (
    <div className="w-full">
      <div className="relative h-6">
        <div className="flex items-center h-6">
          {hasFilter && (
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            </div>
          )}
          <input
            value={value}
            onChange={(e) => column.setFilterValue(e.target.value || undefined)}
            placeholder="..."
            className={`w-full h-6 px-1 text-[10px] border bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${
              hasFilter ? "pl-3 border-blue-500/30" : ""
            }`}
            aria-label={`Filter ${column.id}`}
          />
          {hasFilter && (
            <button
              onClick={() => column.setFilterValue(undefined)}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-[10px] text-gray-400 hover:text-gray-200"
              title="Clear"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
