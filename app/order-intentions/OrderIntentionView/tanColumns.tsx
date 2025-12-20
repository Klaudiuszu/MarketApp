"use client";

import { DefaultCellRenderer } from "@/components/ui/blotter/cellRenderers";
import { CurrencyCellRenderer } from "@/components/ui/blotter/cellRenderers/CurrencyCellRenderer";
import { SideCellRenderer } from "@/components/ui/blotter/cellRenderers/SideCellRenderer";
import { IOrderIntentionsType } from "@/lib/schemas/orderIntentionSchema";
import { ColumnDef } from "@tanstack/react-table";

export const tanColumns: ColumnDef<IOrderIntentionsType>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("id")} />,
    enableSorting: true,
    size: 120,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("symbol")} />,
    enableSorting: true,
    size: 90,
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: ({ row }) => <SideCellRenderer value={row.getValue("side")} />,
    enableSorting: true,
    size: 80,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("quantity")} />,
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <CurrencyCellRenderer value={row.getValue("price")} />,
    enableSorting: true,
    size: 110,
  },
  {
    accessorKey: "orderType",
    header: "Type",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("orderType")} />
    ),
    enableSorting: true,
    size: 90,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("status")} />,
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: "timeInForce",
    header: "TIF",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("timeInForce")} />
    ),
    enableSorting: true,
    size: 70,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("createdAt")} />
    ),
    enableSorting: true,
    size: 140,
  },
  {
    accessorKey: "traderId",
    header: "Trader",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("traderId")} />,
    enableSorting: true,
    size: 90,
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("account")} />,
    enableSorting: true,
    size: 130,
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("strategy")} />,
    enableSorting: true,
    size: 120,
  },
];
