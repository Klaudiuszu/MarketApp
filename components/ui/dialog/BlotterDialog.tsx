"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dialog } from "primereact/dialog";
import Blotter from "../blotter/Blotter";

export type BlotterDialogProps<TData> = {
  visible: boolean;
  title: string;
  columns: ColumnDef<TData, any>[];
  data: TData[];
  onDiscard: () => void;
  onContinue: () => void;
  loading?: boolean;
};

export function BlotterDialog<TData>({
  visible,
  title,
  columns,
  data,
  onDiscard,
  onContinue,
  loading = false,
}: BlotterDialogProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const footer = (
    <div className="flex justify-end gap-2 pt-4">
      <button
        className="px-4 py-2 text-sm bg-gray-700 text-gray-200 rounded hover:bg-gray-600 cursor-pointer"
        onClick={onDiscard}
      >
        Discard
      </button>
      <button
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer"
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );

  return (
    <Dialog
      header={title}
      visible={visible}
      style={{ width: "80vw" }}
      onHide={onDiscard}
      footer={footer}
      modal
      draggable={false}
      className="p-0"
    >
      <Blotter
        table={table}
        title={title}
        loading={loading}
        className="h-[500px]"
      />
    </Dialog>
  );
}
