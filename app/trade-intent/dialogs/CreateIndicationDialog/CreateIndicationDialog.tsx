"use client";

import { useSendData } from "@/components/hooks/useSendData";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ApiStatus } from "../../../../components/ui/blotter/constants";
import { BlotterDialog } from "../../../../components/ui/dialog/BlotterDialog";
import { tanColumns } from "./tanColumns";
import { CreateOrderRow } from "./types";

type CreateIndicationDialogProps = {
  visible: boolean;
  data: CreateOrderRow[];
  onClose: () => void;
  onSubmit: (rows: CreateOrderRow[]) => void;
};

export const CreateIndicationDialog = ({
  visible,
  data,
  onClose,
}: CreateIndicationDialogProps) => {
  const [tableData, setTableData] = useState<CreateOrderRow[]>([]);

  const { onSendData } = useSendData();

  useEffect(() => {
    setTableData(data);
  }, [data, visible]);

  const table = useReactTable({
    data: tableData,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },
    },
  });

  const handleSubmit = async () => {
    try {
      await onSendData("/api/orders", tableData);
      onClose();
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <BlotterDialog
      visible={visible}
      title="Create Indication"
      table={table}
      loading={false}
      status={ApiStatus.ONLINE}
      onDiscard={onClose}
      onContinue={handleSubmit}
    />
  );
};
