import { ColumnDef } from "@tanstack/react-table";

type PortfolioRow = {
  portfolioId: string;
  carveoutId: string;
  portfolioLongName: string;
  carveoutLongName: string;
  currency: string;
};

export const tanColumns: ColumnDef<PortfolioRow>[] = [
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
