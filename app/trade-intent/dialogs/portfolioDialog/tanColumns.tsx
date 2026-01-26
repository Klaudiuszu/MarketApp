import { ColumnDef } from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import { CheckboxSelection } from "../../../../components/ui/blotter/cellRenderers/checkBoxSelection";
import { PortfolioRow } from "../../../../lib/schemas/PortfolioSchema";

export const tanColumns: ColumnDef<PortfolioRow>[] = [
  {
    id: "isChecked",
    header: "Is Checked",
    cell: ({ row }) => <CheckboxSelection row={row} id={uuidv4()} />,
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
