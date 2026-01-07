import { DefaultCellRenderer } from "@/components/ui/blotter/cellRenderers";
import { DropdownEditableCell } from "@/components/ui/blotter/cellRenderers/DropdownEditableCell";
import { ColumnDef } from "@tanstack/react-table";
import { EditableCell } from "../../../../components/ui/blotter/cellRenderers/EditableCell";
import { CreateOrderRow } from "./types";

export const tanColumns: ColumnDef<CreateOrderRow>[] = [
  {
    accessorKey: "carveoutLongname",
    header: "Carveout Long Name",
    cell: ({ row }) => (
      <DefaultCellRenderer value={row.getValue("carveoutLongname")} />
    ),
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => <DefaultCellRenderer value={row.getValue("currency")} />,
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: (ctx) => (
      <DropdownEditableCell<CreateOrderRow>
        ctx={ctx}
        options={[
          { label: "BUY", value: "BUY" },
          { label: "SELL", value: "SELL" },
        ]}
        placeholder="Select side"
      />
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: (ctx) => (
      <DropdownEditableCell<CreateOrderRow>
        ctx={ctx}
        options={[
          { label: "OPEN", value: "OPEN" },
          { label: "CLOSE", value: "CLOSE" },
        ]}
        placeholder="Select State"
      />
    ),
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row, column, table }) => (
      <EditableCell
        value={row.getValue("strategy")}
        rowIndex={row.index}
        columnId={column.id}
        updateData={table.options.meta!.updateData}
      />
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row, column, table }) => (
      <EditableCell
        value={row.getValue("quantity")}
        rowIndex={row.index}
        columnId={column.id}
        updateData={table.options.meta!.updateData}
        type="number"
      />
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row, column, table }) => (
      <EditableCell
        value={row.getValue("price")}
        rowIndex={row.index}
        columnId={column.id}
        updateData={table.options.meta!.updateData}
        type="number"
      />
    ),
  },
];
