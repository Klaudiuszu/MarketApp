"use client";

/**
 * Renders Buy / Sell values with color-coded pill styling.
 */
export function SideCellRenderer({ value }: { value: unknown }) {
  const val = String(value);
  const isBuy = val.toLowerCase() === "buy";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        isBuy
          ? "bg-emerald-800/30 text-emerald-300 border border-emerald-700/50"
          : "bg-rose-800/30 text-rose-300 border border-rose-700/50"
      }`}
    >
      {val}
    </span>
  );
}
