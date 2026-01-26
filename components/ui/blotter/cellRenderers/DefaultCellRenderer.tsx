"use client";

/**
 * Default cell renderer for displaying plain text values
 */
export function DefaultCellRenderer({ value }: { value: unknown }) {
  return <div className="text-gray-300 px-2">{String(value)}</div>;
}
