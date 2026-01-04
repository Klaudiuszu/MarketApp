"use client";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAtom } from "jotai";
import { Toast } from "primereact/toast";
import { useCallback, useEffect, useRef } from "react";
import { useFetchData } from "../../components/hooks/useFetchData";
import Blotter from "../../components/ui/blotter/Blotter";
import BlotterControlBar from "../../components/ui/blotter/BlotterControlBar";
import {
  INewIssueType,
  NewIssuesArraySchema,
} from "../../lib/schemas/NewIssueSchema";
import {
  ITradeIntentType,
  TradeIntentArraySchema,
} from "../../lib/schemas/TradeIntentSchema";
import { toastService } from "../../lib/toastService";
import { dateFilterFn } from "../../lib/utils/dateFilterUtils";
import { atomSelectedNewIssueID } from "./atoms/atomTradeIntent";
import SidePanel from "./TradeIntentView/sidePanel/SidePanel";
import SideRatioChart from "./TradeIntentView/SideRatioChart";
import { tanColumns } from "./TradeIntentView/tanColumns";

const TradeIntent = () => {
  const toastRef = useRef<Toast>(null);
  const [selectedNewIssueID, setSelectedNewIssueID] = useAtom(
    atomSelectedNewIssueID
  );

  const {
    data: ordersData,
    status: ordersStatus,
    loading: ordersLoading,
    fetchData: fetchOrders,
  } = useFetchData<ITradeIntentType>({
    endpoint: selectedNewIssueID ? `/api/orders/${selectedNewIssueID}` : "",
    schema: TradeIntentArraySchema,
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
    filterFns: {
      dateFilterFn: dateFilterFn,
    },
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
      <div className="w-[300px]">
        <SidePanel
          title="All Primary Issuances"
          status={issuesStatus}
          data={issuesData}
          loading={issuesLoading}
          selectedId={selectedNewIssueID}
          onSelect={setSelectedNewIssueID}
        />
      </div>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 px-1 mt-1">
          <div className="h-full bg-gray-900 border border-gray-700 flex flex-col min-h-0">
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
          <div className="h-full bg-gray-900 border border-gray-700 flex flex-col">
            <BlotterControlBar
              title={"Order Side Ratio"}
              status={ordersStatus}
            />

            <div className="flex-1 p-4 min-h-0 overflow-auto">
              <SideRatioChart ordersData={ordersData || []} />
            </div>
          </div>
        </div>
      </div>

      <Toast ref={toastRef} position="bottom-left" />
    </div>
  );
};

export default TradeIntent;
