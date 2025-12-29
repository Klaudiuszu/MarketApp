"use client";

import { DefaultCellRenderer } from "@/components/ui/blotter/cellRenderers";
import { CurrencyCellRenderer } from "@/components/ui/blotter/cellRenderers/CurrencyCellRenderer";
import { IOrderIntentionsType } from "@/lib/schemas/orderIntentionSchema";
import { dateFilterFn } from "@/lib/utils/dateFilterUtils";
import { ColumnDef } from "@tanstack/react-table";
import { BuySellCellRenderer } from "../../../components/ui/blotter/cellRenderers/BuySellCellRenderer";
import { DateRangeFilter } from "../../../components/ui/blotter/filters/DateRangeFilter";

export const tanColumns: ColumnDef<IOrderIntentionsType>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("id")} />,
    enableSorting: true,
    size: 150,
    minSize: 120,
    maxSize: 200,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("symbol")} />,
    enableSorting: true,
    size: 110,
    minSize: 100,
    maxSize: 120,
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: ({ row }) => <BuySellCellRenderer value={row.getValue("side")} />,
    enableSorting: true,
    size: 100,
    minSize: 100,
    maxSize: 100,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("quantity")} />,
    enableSorting: true,
    size: 110,
    minSize: 90,
    maxSize: 130,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <CurrencyCellRenderer value={row.getValue("price")} />,
    enableSorting: true,
    size: 120,
    minSize: 100,
    maxSize: 150,
  },
  {
    accessorKey: "orderType",
    header: "Type",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("orderType")} />
    ),
    enableSorting: true,
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("status")} />,
    enableSorting: true,
    size: 120,
    minSize: 100,
    maxSize: 150,
  },
  {
    accessorKey: "timeInForce",
    header: "TIF",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("timeInForce")} />
    ),
    enableColumnFilter: true,
    enableSorting: true,
    size: 80,
    minSize: 70,
    maxSize: 100,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("createdAt")} />
    ),
    enableSorting: true,
    filterFn: dateFilterFn,
    meta: {
      filterComponent: DateRangeFilter,
    },
    size: 180,
    minSize: 150,
    maxSize: 220,
  },
  {
    accessorKey: "traderId",
    header: "Trader",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("traderId")} />,
    enableSorting: true,
    size: 110,
    minSize: 90,
    maxSize: 130,
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("account")} />,
    enableSorting: true,
    size: 140,
    minSize: 120,
    maxSize: 160,
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("strategy")} />,
    enableSorting: true,
    size: 150,
    minSize: 120,
    maxSize: 200,
  },
];
