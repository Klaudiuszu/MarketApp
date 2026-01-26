"use client";

import type { Column } from "@tanstack/react-table";

type Props<TData = Record<string, unknown>, TValue = unknown> = {
  column: Column<TData, TValue>;
};

export default function ColumnSortButton<
  TData = Record<string, unknown>,
  TValue = unknown,
>({ column }: Props<TData, TValue>) {
  if (!column.getCanSort()) return null;

  const sorted = column.getIsSorted(); // 'asc' | 'desc' | false

  return (
    <button
      onClick={column.getToggleSortingHandler()}
      title={sorted ? `Sorted ${sorted}` : "Toggle sort"}
      className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded text-slate-300 hover:text-slate-50"
    >
      {sorted === "asc" ? "▲" : sorted === "desc" ? "▼" : "↕"}
    </button>
  );
}
