"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCompanyColors } from "../companyColors";
import { ChartTooltip } from "../topCompanies/ChartTooltip";
import {
  formatCurrency,
  formatShortDate,
} from "../topCompanies/dashboard.formatters";
import { ChartDataPoint } from "../topCompanies/types";

interface Props {
  data: ChartDataPoint[];
  companies: string[];
}

/**
 * Line chart presenting sales trends for top companies
 */
export const TopCompaniesChart = ({ data, companies }: Props) => {
  const { getCompanyColor } = useCompanyColors();

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <XAxis
            dataKey="date"
            tickFormatter={formatShortDate}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: "#4B5563" }}
          />

          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: "#4B5563" }}
            tickFormatter={(v) => formatCurrency(v as number)}
            width={60}
          />

          <Tooltip content={<ChartTooltip />} />
          <Legend height={40} iconType="circle" iconSize={8} />

          {companies.map((company) => (
            <Line
              key={company}
              type="monotone"
              dataKey={company}
              stroke={getCompanyColor(company)}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
              connectNulls={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
