"use client";

import { Table } from "@tanstack/react-table";
import HeaderCell from "./HeaderCell";

export type BlotterHeaderProps<TData> = {
  table: Table<TData>;
  customHeaderRenderers?: Record<string, (header: string) => React.ReactNode>;
};

/**
 * BlotterHeader - Renders the table header with column titles, filters, and sort buttons
 */
const BlotterHeader = <TData,>({
  table,
  customHeaderRenderers = {},
}: BlotterHeaderProps<TData>) => {
  return (
    <thead className="bg-gray-800">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <HeaderCell
              key={header.id}
              header={header}
              isLast={index === headerGroup.headers.length - 1}
              customHeaderRenderers={customHeaderRenderers}
            />
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default BlotterHeader;
