import { UserAtomType } from "@/app/atomUser";
import { PortfolioRow } from "../../../../lib/schemas/PortfolioSchema";
import { CreateOrderRow } from "../CreateIndicationDialog/types";

export const mapPortfolioToCreateOrderRow = (
  rows: (PortfolioRow & { allocation: number; comment: string })[],
  selectedId: string,
  user: UserAtomType | null
): CreateOrderRow[] => {
  return rows.map((row) => ({
    newIssueId: selectedId,
    carveoutLongname: row.carveoutLongName,
    carveoutId: row.carveoutId,
    currency: row.currency,
    state: "",
    trader: user?.name || "",
    side: "",
    strategy: "",
    quantity: 0,
    price: 0,
  }));
};
