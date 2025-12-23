"use client";
import { useFetchData } from "@/components/hooks/useFetchData";
import BlotterControlBar from "@/components/ui/blotter/BlotterControlBar";
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
import { useAtom } from "jotai";
import { Toast } from "primereact/toast";
import { useCallback, useEffect, useRef } from "react";
import Blotter from "../../components/ui/blotter/Blotter";
import { atomSelectedNewIssueID } from "./atoms/atomOrderIntention";
import SideRatioChart from "./OrderIntentionView/SideRatioChart";
import { tanColumns } from "./OrderIntentionView/tanColumns";

const OrderIntentions = () => {
  const toastRef = useRef<Toast>(null);
  const [selectedNewIssueID, setSelectedNewIssueID] = useAtom(
    atomSelectedNewIssueID
  );

  const {
    data: ordersData,
    status: ordersStatus,
    loading: ordersLoading,
    fetchData: fetchOrders,
  } = useFetchData<IOrderIntentionsType>({
    endpoint: selectedNewIssueID ? `/api/orders/${selectedNewIssueID}` : "",
    schema: OrderIntentionsArraySchema,
    enableDelay: true,
    delayMs: 1000,
    autoFetch: !!selectedNewIssueID,
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
    data: ordersData ?? [],
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  const handleRefresh = useCallback(async () => {
    try {
      await fetchOrders();
      toastService.success("Data refreshed", "Order data has been updated");
    } catch (error) {
      console.error("Refresh failed:", error);
    }
  }, [fetchOrders]);

  useEffect(() => {
    toastService.register(toastRef as React.RefObject<Toast>);
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-[300px] shrink-0 my-1">
        <SidePanel
          title="All New Issues"
          status={issuesStatus}
          data={issuesData}
          loading={issuesLoading}
          selectedId={selectedNewIssueID}
          onSelect={setSelectedNewIssueID}
        />
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 px-1 mt-1">
          <div className="h-full bg-gray-900 border border-gray-700 overflow-hidden flex flex-col">
            <Blotter
              table={table}
              title="Trade Indications"
              loading={ordersLoading}
              status={ordersStatus}
              onRefresh={handleRefresh}
              storageKey="order_intentions_column_order"
            />
          </div>
        </div>
        <div className="flex-1 px-1 my-1">
          <div className="h-full bg-gray-900 border border-gray-700 overflow-hidden flex flex-col">
            <BlotterControlBar
              title={"Order Side Ratio"}
              status={ordersStatus}
            />

            <div className="flex-1 p-4 min-h-0">
              <SideRatioChart ordersData={ordersData || []} />
            </div>
          </div>
        </div>
      </div>

      <Toast ref={toastRef} position="bottom-left" />
    </div>
  );
};

export default OrderIntentions;
