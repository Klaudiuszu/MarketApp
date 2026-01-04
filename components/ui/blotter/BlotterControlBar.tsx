"use client";

import { Table } from "@tanstack/react-table";
import { useColumnOrder } from "../../../components/hooks/useColumnOrder";
import { ApiStatus } from "./constants";
import { ControlButtons } from "./ControlButtons";
import { StatusIndicator } from "./StatusIndicator";
import { TitleSection } from "./TitleSection";

type BlotterControlBarProps<T> = {
  title?: string;
  status?: ApiStatus;
  className?: string;
  children?: React.ReactNode;
  table?: Table<T>;
  storageKey?: string;
  onRefresh?: () => void;
};

export default function BlotterControlBar<T>({
  title = "Blotter",
  status = ApiStatus.UNKNOWN,
  className = "",
  children,
  table,
  storageKey,
  onRefresh,
}: BlotterControlBarProps<T>) {
  const { handleColumnOrderChange, handleResetOrder } = useColumnOrder(table, {
    storageKey,
  });

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 border-b h-10 border-gray-700 bg-gray-900 ${className}`}
      data-testid="blotter-control-bar"
    >
      <TitleSection title={title} status={<StatusIndicator status={status} />}>
        {children}
      </TitleSection>
      <ControlButtons
        table={table}
        onColumnOrderChange={handleColumnOrderChange}
        onResetOrder={handleResetOrder}
        onRefresh={onRefresh}
      />
    </div>
  );
}
