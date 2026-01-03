"use client";
import React, { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ITradeIntentType } from "../../../lib/schemas/TradeIntentSchema";
enum Side {
  BUY = "BUY",
  SELL = "SELL",
}

interface SideRatioChartProps {
  ordersData: ITradeIntentType[];
}

const SideRatioChart: React.FC<SideRatioChartProps> = ({ ordersData }) => {
  const sideData = useMemo(() => {
    if (!ordersData || ordersData.length === 0) {
      return [{ name: "No Data", value: 1, color: "#6b7280" }];
    }

    const buyCount = ordersData.filter(
      (order) => order.side === Side.BUY
    ).length;
    const sellCount = ordersData.filter(
      (order) => order.side === Side.SELL
    ).length;
    const total = ordersData.length;

    return [
      {
        name: "BUY",
        value: buyCount,
        percentage: total > 0 ? ((buyCount / total) * 100).toFixed(1) : "0",
        color: "#10b981",
      },
      {
        name: "SELL",
        value: sellCount,
        percentage: total > 0 ? ((sellCount / total) * 100).toFixed(1) : "0",
        color: "#ef4444",
      },
    ];
  }, [ordersData]);

  const hasData = ordersData && ordersData.length > 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sideData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={
                hasData
                  ? (entry) =>
                      `${entry.name}: ${entry.value} (${entry.percent}%)`
                  : false
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sideData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                if (!hasData) return ["No data", ""];
                const entry = props.payload;
                return [`${value} orders (${entry.percentage}%)`, entry.name];
              }}
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4b5563",
                borderRadius: "6px",
                color: "white",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-white font-medium">BUY Orders</span>
            </div>
            <div className="text-2xl font-bold text-emerald-500">
              {sideData.find((d) => d.name === "BUY")?.value || 0}
            </div>
            <div className="text-gray-400 text-sm">
              {hasData && ordersData.length > 0
                ? `${
                    sideData.find((d) => d.name === "BUY")?.value || "0"
                  }% of total`
                : "No data"}
            </div>
          </div>

          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-white font-medium">SELL Orders</span>
            </div>
            <div className="text-2xl font-bold text-red-500">
              {sideData.find((d) => d.name === "SELL")?.value || 0}
            </div>
            <div className="text-gray-400 text-sm">
              {hasData && ordersData.length > 0
                ? `${
                    sideData.find((d) => d.name === "SELL")?.value || "0"
                  }% of total`
                : "No data"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideRatioChart;
