"use client";

import { Table } from "@tanstack/react-table";
import { ColumnSelector } from "./ColumnSelector";

interface ControlButtonsProps<T> {
  table?: Table<T>;
  onColumnOrderChange: (sourceIndex: number, destinationIndex: number) => void;
  onResetOrder: () => void;
  onRefresh?: () => void;
}

export function ControlButtons<T>({
  table,
  onColumnOrderChange,
  onResetOrder,
  onRefresh,
}: ControlButtonsProps<T>) {
  return (
    <div className="flex items-center gap-1">
      {onRefresh && (
        <button
          className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded hover:bg-gray-800"
          onClick={onRefresh}
          title="Refresh data"
        >
          <i className="pi pi-sync text-sm"></i>
        </button>
      )}
      {table && (
        <>
          <ColumnSelector
            columns={table.getAllLeafColumns()}
            onColumnOrderChange={onColumnOrderChange}
          />

          <button
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors rounded hover:bg-gray-800"
            onClick={onResetOrder}
            title="Reset to default column order"
          >
            <i className="pi pi-replay text-sm"></i>
          </button>
        </>
      )}
      {table && (
        <button
          className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded hover:bg-gray-800"
          onClick={() => table.resetSorting()}
          title="Clear sorting"
        >
          <i className="pi pi-sort-amount-down text-sm"></i>
        </button>
      )}
    </div>
  );
}
