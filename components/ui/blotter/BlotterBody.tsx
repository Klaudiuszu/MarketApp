"use client";

import { flexRender, Table } from "@tanstack/react-table";
import { ROW_HEIGHT } from "../../../lib/constants";

export type BlotterBodyProps<TData> = {
  table: Table<TData>;
  zebraStriping?: {
    enabled?: boolean;
    evenRowClass?: string;
    oddRowClass?: string;
  };
};

/**
 * BlotterBody - Renders the table body with data rows
 */
export default function BlotterBody<TData>({
  table,
  zebraStriping = {
    enabled: true,
    evenRowClass: "bg-gray-800/60",
    oddRowClass: "bg-gray-900/98",
  },
}: BlotterBodyProps<TData>) {
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            className="px-3 py-2 text-center text-gray-400 border-b border-gray-700 w-fix"
            colSpan={table.getAllLeafColumns().length}
          >
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <TableRow
          key={row.id}
          row={row}
          rowIndex={rowIndex}
          zebraStriping={zebraStriping}
        />
      ))}
    </tbody>
  );
}

type TableRowProps<TData> = {
  row: any;
  rowIndex: number;
  zebraStriping: BlotterBodyProps<TData>["zebraStriping"];
};

/**
 * TableRow - Individual table row component
 */
function TableRow<TData>({
  row,
  rowIndex,
  zebraStriping,
}: TableRowProps<TData>) {
  const zebraClass = zebraStriping?.enabled
    ? rowIndex % 2 === 0
      ? zebraStriping.evenRowClass
      : zebraStriping.oddRowClass
    : "";

  return (
    <tr
      key={row.id}
      className={`${zebraClass} hover:bg-gray-800 border-b border-gray-700/60`}
      data-testid="blotter-row"
      data-row-index={rowIndex}
      style={{
        height: ROW_HEIGHT,
        maxHeight: ROW_HEIGHT,
      }}
    >
      {row.getVisibleCells().map((cell: any, cellIndex: number) => (
        <TableCell
          key={cell.id}
          cell={cell}
          cellIndex={cellIndex}
          totalCells={row.getVisibleCells().length}
        />
      ))}
    </tr>
  );
}

type TableCellProps<TData> = {
  cell: any;
  cellIndex: number;
  totalCells: number;
};

/**
 * TableCell - Individual table cell component
 */
function TableCell<TData>({ cell }: TableCellProps<TData>) {
  const cellValue = cell.getValue();
  const isNumeric = typeof cellValue === "number";
  const columnSize = cell.column.getSize();

  // Use a safe approach for width calculation
  const width = columnSize && columnSize > 0 ? `${columnSize}px` : "auto";

  return (
    <td
      key={cell.id}
      className={`
    text-[12px]
    align-middle
    border-r border-gray-700/60
  `}
      data-column-id={cell.column.id}
      data-cell-type={isNumeric ? "numeric" : "text"}
      style={{
        width,
        minWidth: `${cell.column.columnDef.minSize || 80}px`,
        height: ROW_HEIGHT,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        className={`
    flex items-center
    h-full
    overflow-visible
    ${isNumeric ? "justify-end" : "justify-start"}
    ${
      cell.column.id === "createdAt" || cell.column.id === "strategy"
        ? "whitespace-normal"
        : "whitespace-nowrap"
    }
  `}
        style={{
          textOverflow: "ellipsis",
        }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    </td>
  );
}
