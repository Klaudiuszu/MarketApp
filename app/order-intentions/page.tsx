"use client";
import { useFetchData } from "@/components/hooks/useFetchData";
import SidePanel from "@/components/ui/SidePanel";
import {
  INewIssueType,
  NewIssuesArraySchema,
} from "@/lib/schemas/NewIssueSchema";
import {
  IOrderIntentionsType,
  OrderIntentionsArraySchema,
} from "@/lib/schemas/orderIntentionSchema";
import { toastService } from "@/lib/toastService";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import Blotter from "../../components/ui/blotter/Blotter";
import { tanColumns } from "./OrderIntentionView/tanColumns";

const OrderIntentions = () => {
  const toastRef = useRef<Toast>(null);
  const {
    data: ordersData,
    status: ordersStatus,
    loading: ordersLoading,
  } = useFetchData<IOrderIntentionsType>({
    endpoint: "/api/orders",
    schema: OrderIntentionsArraySchema,
    enableDelay: true,
    delayMs: 3000,
  });
  const {
    data: issuesData,
    status: issuesStatus,
    loading: issuesLoading,
  } = useFetchData<INewIssueType>({
    endpoint: "/api/issues",
    schema: NewIssuesArraySchema,
    enableDelay: true,
    delayMs: 1000,
  });

  const table = useReactTable({
    data: ordersData,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    toastService.register(toastRef as React.RefObject<Toast>);
  }, []);

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <div className="w-[300px] shrink-0 min-h-0">
        <SidePanel
          title="All New Issues"
          status={issuesStatus}
          data={issuesData}
          loading={issuesLoading}
        />
      </div>
      <div className="flex-1 min-h-0 p-1">
        <Blotter
          table={table}
          title="Order Intentions"
          loading={ordersLoading}
          status={ordersStatus}
        />
      </div>
      <Toast ref={toastRef} position="bottom-left" />
    </div>
  );
};

export default OrderIntentions;
