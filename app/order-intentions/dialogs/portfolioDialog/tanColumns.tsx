import { CheckboxSelection } from "@/components/ui/blotter/cellRenderers/checkBoxSelection";
import { PortfolioRow } from "@/lib/schemas/PortfolioSchema";
import { ColumnDef } from "@tanstack/react-table";

export const tanColumns: ColumnDef<PortfolioRow>[] = [
  {
    id: "isChecked",
    header: "Is Checked",
    cell: ({ row }) => (
      <CheckboxSelection
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
    size: 50,
  },
  {
    accessorKey: "portfolioId",
    header: "Portfolio ID",
  },
  {
    accessorKey: "portfolioLongName",
    header: "Portfolio Long Name",
  },
  {
    accessorKey: "carveoutId",
    header: "Carve-out ID",
  },
  {
    accessorKey: "carveoutLongName",
    header: "Carve-out Long Name",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
];
