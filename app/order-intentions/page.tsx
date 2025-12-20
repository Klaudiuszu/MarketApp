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
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Blotter from "../../components/ui/blotter/Blotter";
import { tanColumns } from "./OrderIntentionView/tanColumns";

const OrderIntentions = () => {
  const {
    data: ordersData,
    status: ordersStatus,
    loading: ordersLoading,
    fetchData: fetchOrders,
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
    fetchData: fetchIssues,
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

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <div className="w-[300px] shrink-0 min-h-0">
        <SidePanel
          title="All New Issues"
          status={issuesStatus}
          data={issuesData}
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
    </div>
  );
};

export default OrderIntentions;
