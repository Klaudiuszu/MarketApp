"use client";

import { Table } from "@tanstack/react-table";
import { Dialog } from "primereact/dialog";
import Blotter from "../blotter/Blotter";
import { ApiStatus } from "../blotter/constants";

export type BlotterDialogProps<TData> = {
  visible: boolean;
  title: string;
  table: Table<TData>;
  status: ApiStatus;
  loading: boolean;
  onDiscard: () => void;
  onContinue: () => void;
};

export function BlotterDialog<TData>({
  table,
  visible,
  status,
  title,
  onDiscard,
  onContinue,
  loading = false,
}: BlotterDialogProps<TData>) {
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
      <Blotter table={table} title={title} loading={loading} status={status} />
    </Dialog>
  );
}
