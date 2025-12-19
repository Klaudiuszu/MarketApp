"use client";

import type { Column } from "@tanstack/react-table";

type ColumnFilterInputProps = {
  column: Column<any, any>;
};

/**
 * ColumnFilterInput - Input component for filtering table columns
 * Automatically hides if column doesn't support filtering
 */
export default function ColumnFilterInput({ column }: ColumnFilterInputProps) {
  if (!column.getCanFilter()) return null;

  const value = column.getFilterValue() ?? "";

  console.log({ value });

  return (
    <div className="w-full">
      <div className="relative">
        <input
          value={String(value)}
          onChange={(e) => column.setFilterValue(e.target.value || undefined)}
          placeholder="filter..."
          className="w-full py-[1] pl-2 text-[10px] border bg-gray-700 border-gray-600 text-gray-500 placeholder:text-gray-400/10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          aria-label={`Filter ${column.id} column`}
        />
        {value && (
          <button
            onClick={() => column.setFilterValue(undefined)}
            title="Clear filter"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200"
            aria-label="Clear filter"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
