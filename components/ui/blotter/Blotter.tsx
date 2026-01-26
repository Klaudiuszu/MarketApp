"use client";

import { Table } from "@tanstack/react-table";
import BlotterBody from "./BlotterBody";
import BlotterControlBar from "./BlotterControlBar";
import BlotterHeader from "./BlotterHeader";
import { ApiStatus } from "./constants";
import { Loader } from "./Loader";

export type BlotterProps<TData> = {
  table: Table<TData>;
  title?: string;
  status?: ApiStatus;
  loading?: boolean;
  onRefresh?: () => void;
  storageKey?: string;
  customCellRenderers?: Record<
    string,
    (value: unknown, row: TData) => React.ReactNode
  >;
  customHeaderRenderers?: Record<string, (header: string) => React.ReactNode>;
  zebraStriping?: {
    enabled?: boolean;
    evenRowClass?: string;
    oddRowClass?: string;
  };
  className?: string;
};

/**
 * Blotter is a generic table component built on top of TanStack Table,
 * providing header, body, footer, and optional custom rendering logic.
 *
 * @template TData Type of a single table row
 *
 * @param table TanStack Table instance controlling state and data
 * @param onRefresh Callback for refresh button click
 * @param storageKey Key for localStorage to save column order
 * @param customCellRenderers Optional cell renderers mapped by column ID
 * @param customHeaderRenderers Optional header renderers mapped by column ID
 * @param zebraStriping Optional configuration for alternating row styles
 * @param className Optional CSS class applied to the root container
 *
 * @returns A styled, scrollable table component with optional customization
 */
export default function Blotter<TData>({
  table,
  title = "Blotter",
  status = ApiStatus.UNKNOWN,
  loading = false,
  onRefresh,
  storageKey,
  className = "",
  zebraStriping = {
    enabled: true,
    evenRowClass: "bg-gray-800/60",
    oddRowClass: "bg-gray-900/98",
  },
}: BlotterProps<TData>) {
  return (
    <div
      className={`relative w-full h-[600px] border bg-gray-900 border-gray-700 shadow-sm text-gray-200 overflow-x-auto ${className}`}
    >
      <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700">
        <BlotterControlBar
          title={title}
          status={status}
          table={table}
          storageKey={storageKey}
          onRefresh={onRefresh}
        />
        <table className="table-fixed w-full text-xs">
          <BlotterHeader table={table} />
        </table>
      </div>
      <div className="relative h-[calc(100%-96px)]">
        {!loading && (
          <table className="table-fixed w-full text-xs">
            <BlotterBody table={table} zebraStriping={zebraStriping} />
          </table>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
}
