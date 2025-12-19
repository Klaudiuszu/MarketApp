"use client";

import { Table } from "@tanstack/react-table";
import BlotterBody from "./BlotterBody";
import BlotterControlBar from "./BlotterControlBar";
import BlotterHeader from "./BlotterHeader";
import { ApiStatus } from "./constants";

export type BlotterProps<TData> = {
  table: Table<TData>;
  title?: string;
  status?: ApiStatus;
  customCellRenderers?: Record<
    string,
    (value: any, row: TData) => React.ReactNode
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
 * @param customCellRenderers Optional cell renderers mapped by column ID
 * @param customHeaderRenderers Optional header renderers mapped by column ID
 * @param zebraStriping Optional configuration for alternating row styles
 * @param className Optional CSS class applied to the root container
 * @param footerContent Optional custom content rendered in the footer
 *
 * @returns A styled, scrollable table component with optional customization
 */
export default function Blotter<TData>({
  table,
  title = "Blotter",
  status = ApiStatus.UNKNOWN,
  className = "",
  zebraStriping = {
    enabled: true,
    evenRowClass: "bg-gray-800/60",
    oddRowClass: "bg-gray-900/98",
  },
}: BlotterProps<TData>) {
  return (
    <div
      className={`w-full h-[600px] overflow-auto border rounded-md bg-gray-900 border-gray-700 shadow-sm text-gray-200 ${className}`}
    >
      <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700">
        <BlotterControlBar title={title} status={status} />
        <div className="overflow-hidden">
          <table
            className="min-w-full table-fixed text-sm"
            style={{ tableLayout: "fixed" }}
          >
            <BlotterHeader table={table} />
          </table>
        </div>
      </div>
      <div className="overflow-auto">
        <table
          className="min-w-full table-fixed text-sm"
          style={{ tableLayout: "fixed" }}
        >
          <BlotterBody table={table} zebraStriping={zebraStriping} />
        </table>
      </div>
    </div>
  );
}
