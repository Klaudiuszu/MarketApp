"use client";

import { useAtomValue } from "jotai";
import { topSalesCompaniesAtom } from "../atoms/topSalesCompanies.atom";
import { TopSalesCompaniesChart } from "./TopSalesCompaniesChart";

interface Props {
  isLoading: boolean;
}

export const TopSalesCompaniesDashboard = ({ isLoading }: Props) => {
  const data = useAtomValue(topSalesCompaniesAtom);

  return (
    <div className="h-full min-h-0 flex flex-col">
      <header className="mb-4 shrink-0">
        <h3 className="text-lg font-semibold">Top Sales Companies</h3>
        <p className="text-sm text-zinc-400">Companies ranked by total sales</p>
      </header>
      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-zinc-500">
            Loading sales data…
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-500">
            No sales data available
          </div>
        ) : (
          <TopSalesCompaniesChart data={data} />
        )}
      </div>
    </div>
  );
};
