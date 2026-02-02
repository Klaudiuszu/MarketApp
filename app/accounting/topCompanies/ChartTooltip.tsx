import { useCompanyColors } from "../companyColors";
import { formatCurrency } from "./dashboard.formatters";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

/**
 * Custom tooltip for sales chart
 */
export const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  const { getCompanyColor } = useCompanyColors();
  if (!active || !payload?.length) return null;

  const visibleEntries = payload.filter((e) => e.value > 0);
  if (!visibleEntries.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-lg min-w-48">
      <p className="font-bold text-white mb-2">
        {new Date(label!).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {visibleEntries.map((entry, index) => (
        <div key={index} className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: getCompanyColor(entry.name || entry.dataKey),
              }}
            />
            <span className="text-sm text-zinc-300">{entry.name}</span>
          </div>
          <span className="text-sm font-medium">
            {formatCurrency(entry.value ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
};
