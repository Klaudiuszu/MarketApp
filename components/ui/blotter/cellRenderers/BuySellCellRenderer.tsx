"use client";

interface BuySellCellRendererProps {
  value: any;
  buyClassName?: string;
  sellClassName?: string;
}

/**
 * Specialized cell renderer for buy/sell values with colored backgrounds
 */
export const BuySellCellRenderer = ({
  value,
  buyClassName = "has-buy-cell",
  sellClassName = "has-sell-cell",
}: BuySellCellRendererProps) => {
  const stringValue = String(value).toLowerCase();

  const getCellClassName = () => {
    if (stringValue === "buy") return buyClassName;
    if (stringValue === "sell") return sellClassName;
    return "";
  };

  return (
    <div
      className={`h-full w-full flex items-center justify-center ${getCellClassName()}`}
    >
      {stringValue.toUpperCase()}
    </div>
  );
};
