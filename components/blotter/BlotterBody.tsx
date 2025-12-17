"use client";

import { flexRender, Table } from "@tanstack/react-table";

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
            className="px-3 py-4 text-center text-gray-400 border-b border-gray-700"
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
function TableCell<TData>({
  cell,
  cellIndex,
  totalCells,
}: TableCellProps<TData>) {
  const cellValue = cell.getValue();
  const isNumeric = typeof cellValue === "number";

  return (
    <td
      key={cell.id}
      className={`px-3 py-1 text-[12px] whitespace-nowrap align-middle ${
        isNumeric ? "text-right" : "text-left"
      } ${cellIndex < totalCells - 1 ? "border-r border-gray-700/60" : ""}`}
      data-column-id={cell.column.id}
      data-cell-type={isNumeric ? "numeric" : "text"}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
