"use client";

import Blotter from "@/components/blotter/Blotter";
import { CurrencyCellRenderer } from "@/components/blotter/cellRenderers/CurrencyCellRenderer";
import { orderIntentionsMock } from "@/database/mocks/orderIntentionsMock";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { tanColumns } from "./OrderIntentionView/tanColumns";

const OrderIntentions = () => {
  const data = useMemo(() => orderIntentionsMock, []);
  const cols = useMemo(() => tanColumns, []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: cols,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-4">Order intentions (Blotter)</h1>
      <Blotter
        table={table}
        customCellRenderers={{
          price: (value) => (
            <CurrencyCellRenderer value={value} currency="EUR" />
          ),
        }}
        footerContent={
          <div className="flex justify-between items-center">
            <div>Custom footer content</div>
            <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
              Export Data
            </button>
          </div>
        }
        className="max-h-96"
      />
    </main>
  );
};

export default OrderIntentions;
