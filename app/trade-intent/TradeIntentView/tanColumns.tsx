import { ColumnDef } from "@tanstack/react-table";
import { DefaultCellRenderer } from "../../../components/ui/blotter/cellRenderers";
import { BuySellCellRenderer } from "../../../components/ui/blotter/cellRenderers/BuySellCellRenderer";
import { CurrencyCellRenderer } from "../../../components/ui/blotter/cellRenderers/CurrencyCellRenderer";
import { DateRangeFilter } from "../../../components/ui/blotter/filters/DateRangeFilter";
import { ITradeIntentType } from "../../../lib/schemas/TradeIntentSchema";
import { dateFilterFn } from "../../../lib/utils/dateFilterUtils";

export const tanColumns: ColumnDef<ITradeIntentType>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("id")} />,
    enableSorting: true,
    size: 260,
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <BuySellCellRenderer value={row.getValue("state")} />,
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: ({ row }) => <BuySellCellRenderer value={row.getValue("side")} />,
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: "carveoutLongname",
    header: "Carveout Long name",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("carveoutLongname")} />
    ),
    enableSorting: true,
    size: 200,
  },
  {
    accessorKey: "carveoutId",
    header: "Carveout ID",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("carveoutId")} />
    ),
    enableSorting: true,
    size: 200,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("quantity")} />,
    enableSorting: true,
    size: 110,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <CurrencyCellRenderer value={row.getValue("price")} />,
    enableSorting: true,
    size: 120,
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("strategy")} />,
    enableSorting: true,
    size: 150,
  },
  {
    accessorKey: "trader",
    header: "Trader",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("trader")} />,
    enableSorting: true,
    size: 110,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("createdAt")} />
    ),
    enableSorting: true,
    filterFn: dateFilterFn,
    meta: { filterComponent: DateRangeFilter },
    size: 180,
  },
];
