"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TopSalesCompany } from "../atoms/topSalesCompanies.atom";
import { useCompanyColors } from "../companyColors";

interface Props {
  data: TopSalesCompany[];
}

const formatCurrency = (value: number) =>
  value >= 1_000_000
    ? `$${(value / 1_000_000).toFixed(2)}M`
    : `$${(value / 1_000).toFixed(1)}K`;

export const TopSalesCompaniesChart = ({ data }: Props) => {
  const { getCompanyColor } = useCompanyColors();

  return (
    <div className="w-full h-full min-h-0 flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 80, top: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            type="number"
            tickFormatter={formatCurrency}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
          />
          <YAxis
            type="category"
            dataKey="company"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            width={150}
          />
          <Tooltip
            formatter={(v) => formatCurrency(v as number)}
            labelStyle={{ color: "#FFF" }}
            contentStyle={{
              backgroundColor: "#1F2937",
              borderColor: "#374151",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="totalSales" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getCompanyColor(entry.company)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
