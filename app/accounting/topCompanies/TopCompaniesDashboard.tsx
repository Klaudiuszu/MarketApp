"use client";

import { useAtomValue } from "jotai";
import { forwardRef } from "react";
import { Loader } from "../../../components/ui/blotter/Loader";
import { accountingLoadingAtom } from "../atoms/accountingData.atom";
import { topCompaniesAtom } from "../atoms/topCompanies.atom";
import { TopCompaniesChart } from "../utils/TopCompaniesChart";
import { EmptyState } from "./emptyState";

/**
 * Dashboard container for top companies sales trends
 * Pure presentation component – data comes from atoms
 */
export const TopCompaniesDashboard = forwardRef<HTMLDivElement>((_, ref) => {
  const isLoading = useAtomValue(accountingLoadingAtom);
  const { chartData, topCompanies } = useAtomValue(topCompaniesAtom);

  if (isLoading) {
    return (
      <div ref={ref} className="h-full flex flex-col">
        <header className="p-4 border-b border-zinc-800">
          <h3 className="text-lg font-semibold">Sales Trend Over Time</h3>
          <p className="text-sm text-zinc-400">Loading company sales data...</p>
        </header>
        <div className="flex-1">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="h-full flex flex-col">
      <header className="p-4 border-b border-zinc-800">
        <h3 className="text-lg font-semibold">Sales Trend Over Time</h3>
        <p className="text-sm text-zinc-400">
          Top companies with actual sales data
        </p>
      </header>

      <div className="flex-1 p-4">
        {chartData.length === 0 ? (
          <EmptyState
            title="No sales data to display"
            subtitle="All sales values are zero"
          />
        ) : (
          <>
            <TopCompaniesChart data={chartData} companies={topCompanies} />

            <footer className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
              Showing {chartData.length} active days • {topCompanies.length}{" "}
              companies
            </footer>
          </>
        )}
      </div>
    </div>
  );
});

TopCompaniesDashboard.displayName = "TopCompaniesDashboard";
