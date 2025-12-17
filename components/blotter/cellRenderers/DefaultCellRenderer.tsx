// components/blotter/cellRenderers/defaultCellRenderer.tsx
"use client";

/**
 * Default cell renderer for displaying plain text values
 */
export function DefaultCellRenderer({ value }: { value: any }) {
  return <div className="text-gray-300">{String(value)}</div>;
}
