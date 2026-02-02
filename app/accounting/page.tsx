"use client";

import { useFetchData } from "@/components/hooks/useFetchData";
import { DashboardGrid, WidgetConfig } from "@/components/widget";
import {
  AccountingArraySchema,
  IAccountingType,
} from "@/lib/schemas/AccountingSchema";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { accountingDataAtom } from "./atoms/accountingData.atom";
import { TopCompaniesDashboard } from "./topCompanies/TopCompaniesDashboard";
import { TopSalesCompaniesDashboard } from "./topSalesCompanies/TopSalesCompaniesDashboard";

const Accounting = () => {
  const setAccountingData = useSetAtom(accountingDataAtom);
  const { data: accountingData, loading: accountingLoading } =
    useFetchData<IAccountingType>({
      endpoint: "/api/accounting/all",
      schema: AccountingArraySchema,
      enableDelay: true,
      delayMs: 1000,
    });

  useEffect(() => {
    setAccountingData(accountingData);
  }, [accountingData]);

  const widgets: WidgetConfig[] = [
    {
      id: "top-companies",
      component: <TopCompaniesDashboard />,
      defaultWidth: 4,
      defaultHeight: 5,
    },
    {
      id: "top-sales-companies",
      component: <TopSalesCompaniesDashboard isLoading={accountingLoading} />,
      defaultWidth: 2,
      defaultHeight: 5,
    },
  ];

  return <DashboardGrid widgets={widgets} cols={6} rowHeight={100} />;
};

export default Accounting;
