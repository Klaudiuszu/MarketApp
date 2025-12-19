"use client";

import Blotter from "@/components/blotter/Blotter";
import { orderIntentionsMock } from "@/database/mocks/orderIntentionsMock";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { tanColumns } from "./OrderIntentionView/tanColumns";

const OrderIntentions = () => {
  const table = useReactTable({
    data: orderIntentionsMock,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return (
    <main className="p-4">
      <Blotter table={table} title="Order Intentions" />
    </main>
  );
};

export default OrderIntentions;
