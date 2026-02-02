"use client";

import { useFetchData } from "@/components/hooks/useFetchData";
import {
  AccountingArraySchema,
  IAccountingType,
} from "@/lib/schemas/AccountingSchema";

const Accounting = () => {
  const {
    data: accountingData,
    status: accountingStatus,
    loading: accountingLoading,
  } = useFetchData<IAccountingType>({
    endpoint: "/api/accounting/all",
    schema: AccountingArraySchema,
    enableDelay: true,
    delayMs: 1000,
  });

  return <div className="flex flex-1 overflow-hidden w-full"></div>;
};

export default Accounting;
