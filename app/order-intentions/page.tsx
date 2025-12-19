"use client";

import Blotter from "@/components/blotter/Blotter";
import { ApiStatus } from "@/components/blotter/constants";
import { IOrderIntentionsType } from "@/database/mocks/orderIntentionsMock";
import { getData } from "@/utils/getData";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { tanColumns } from "./OrderIntentionView/tanColumns";

const OrderIntentions = () => {
  const [data, setData] = useState<IOrderIntentionsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.UNKNOWN);

  const table = useReactTable({
    data,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });
  useEffect(() => {
    getData({ setData, setStatus }).finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-4">
      <Blotter
        table={table}
        title="Order Intentions"
        loading={loading}
        status={status}
      />
    </main>
  );
};

export default OrderIntentions;
