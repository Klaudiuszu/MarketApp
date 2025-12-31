"use client";

import { tanColumns } from "@/app/order-intentions/dialogs/portfolioDialog/tanColumns";
import { useFetchData } from "@/components/hooks/useFetchData";
import { BlotterDialog } from "@/components/ui/dialog/BlotterDialog";
import {
  PortfolioListSchema,
  PortfolioRow,
} from "@/lib/schemas/PortfolioSchema";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type PortfolioBlotterDialogProps = {
  visible: boolean;
  onClose: () => void;
  onContinue?: (selected: PortfolioRow[]) => void;
};

export const PortfolioBlotterDialog = ({
  visible,
  onClose,
  onContinue,
}: PortfolioBlotterDialogProps) => {
  const { data, loading, fetchData } = useFetchData<PortfolioRow>({
    endpoint: "/api/portfolios",
    schema: PortfolioListSchema,
    autoFetch: false,
  });

  const [editableData, setEditableData] = useState<PortfolioRow[]>([]);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setEditableData((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const table = useReactTable({
    data: editableData,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      updateData,
    },
  });

  useEffect(() => {
    if (visible) {
      fetchData()
        .then((fetched) => setEditableData(fetched))
        .catch(() => {});
    }
  }, [visible, fetchData]);

  return (
    <BlotterDialog
      visible={visible}
      title="Select Portfolio & Carve-out"
      table={table}
      loading={loading}
      onDiscard={onClose}
      onContinue={() => {
        const selected = table
          .getSelectedRowModel()
          .rows.map((row) => row.original);

        onContinue?.(selected);
        onClose();
      }}
    />
  );
};
