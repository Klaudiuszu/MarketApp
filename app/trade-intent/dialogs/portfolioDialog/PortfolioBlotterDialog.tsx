"use client";
import { ITradeIntentType } from "@/lib/schemas/TradeIntentSchema";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useFetchData } from "../../../../components/hooks/useFetchData";
import { BlotterDialog } from "../../../../components/ui/dialog/BlotterDialog";
import {
  PortfolioListSchema,
  PortfolioRow,
} from "../../../../lib/schemas/PortfolioSchema";
import { tanColumns } from "./tanColumns";

type PortfolioBlotterDialogProps = {
  visible: boolean;
  orders: ITradeIntentType[] | null;
  onClose: () => void;
  onContinue?: (selected: PortfolioRow[]) => void;
};

const getCarveoutStatus = (
  carveoutId: string,
  orders: ITradeIntentType[] | null
): "OPEN" | "CLOSED" | null => {
  if (!orders) return null;

  const order = orders.find((o) => o.carveoutId === carveoutId);
  return order?.state || null;
};

export const PortfolioBlotterDialog = ({
  visible,
  orders,
  onClose,
  onContinue,
}: PortfolioBlotterDialogProps) => {
  const { loading, status, fetchData } = useFetchData<PortfolioRow>({
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

  const dataWithDisabled = useMemo(() => {
    return editableData.map((row) => {
      const carveoutStatus = getCarveoutStatus(row.carveoutId, orders);
      const isDisabled = carveoutStatus === "OPEN";

      return {
        ...row,
        isDisabled,
        carveoutStatus,
      };
    });
  }, [editableData, orders]);

  const table = useReactTable({
    data: dataWithDisabled,
    columns: tanColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: (row) => {
      return !row.original.isDisabled;
    },
    getRowId: (row) => row.carveoutId,
    meta: {
      updateData,
    },
  });

  useEffect(() => {
    if (visible) {
      fetchData()
        .then(
          (
            fetched: SetStateAction<
              {
                portfolioId: string;
                carveoutId: string;
                portfolioLongName: string;
                carveoutLongName: string;
                currency: string;
              }[]
            >
          ) => setEditableData(fetched)
        )
        .catch(() => {});
    }
  }, [visible, fetchData]);

  return (
    <BlotterDialog
      visible={visible}
      title="Select Portfolio & Carve-out"
      table={table}
      loading={loading}
      status={status}
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
