"use client";

import {
  CurrencyCellRenderer,
  DefaultCellRenderer,
  SideCellRenderer,
} from "@/components/blotter/cellRenderers";
import { IOrderIntentionsType } from "@/database/mocks/orderIntentionsMock";
import { ColumnDef } from "@tanstack/react-table";

export const tanColumns: ColumnDef<IOrderIntentionsType>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("id")} />,
    enableSorting: true,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("symbol")} />,
    enableSorting: true,
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: ({ row }) => <SideCellRenderer value={row.getValue("side")} />,
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("quantity")} />,
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <CurrencyCellRenderer value={row.getValue("price")} />,
    enableSorting: true,
  },
  {
    accessorKey: "orderType",
    header: "Type",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("orderType")} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("status")} />,
    enableSorting: true,
  },
  {
    accessorKey: "timeInForce",
    header: "TIF",
    cell: ({ row }) => (
      <div className="text-gray-300 text-xs">{row.getValue("timeInForce")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("createdAt")} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "traderId",
    header: "Trader",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("traderId")} />,
    enableSorting: true,
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("account")} />,
    enableSorting: true,
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("strategy")} />,
    enableSorting: true,
  },
];
