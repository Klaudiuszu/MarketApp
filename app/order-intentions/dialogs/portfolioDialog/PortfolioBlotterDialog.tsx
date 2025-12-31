"use client";

import { tanColumns } from "@/app/order-intentions/dialogs/portfolioDialog/tanColumns";
import { useFetchData } from "@/components/hooks/useFetchData";
import { BlotterDialog } from "@/components/ui/dialog/BlotterDialog";
import {
  PortfolioListSchema,
  PortfolioRow,
} from "@/lib/schemas/PortfolioSchema";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect } from "react";

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

  const table = useReactTable({
    data,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  useEffect(() => {
    if (visible) {
      fetchData().catch(() => {});
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
