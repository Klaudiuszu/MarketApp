"use client";

/**
 * Formats numeric values as localized currency.
 */
export function CurrencyCellRenderer({
  value,
  currency = "USD",
}: {
  value: number;
  currency?: string;
}) {
  return (
    <div className="text-right font-mono">
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(value)}
    </div>
  );
}
