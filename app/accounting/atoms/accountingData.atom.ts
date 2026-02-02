import { IAccountingType } from "@/lib/schemas/AccountingSchema";
import { atom } from "jotai";

export const accountingDataAtom = atom<IAccountingType[] | null>(null);
export const accountingLoadingAtom = atom<boolean>(false);
