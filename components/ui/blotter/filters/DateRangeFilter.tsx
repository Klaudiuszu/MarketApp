"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import type { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import type { Column } from "@tanstack/react-table";

interface DateFilterValue {
  start: string;
  end: string;
}

interface DateRangeFilterProps<
  TData = Record<string, unknown>,
  TValue = unknown,
> {
  column: Column<TData, TValue>;
  onFilter: (value: DateFilterValue | null) => void;
}

export function DateRangeFilter<
  TData = Record<string, unknown>,
  TValue = unknown,
>({ column, onFilter }: DateRangeFilterProps<TData, TValue>) {
  const [dateRange, setDateRange] = useState<[Nullable<Date>, Nullable<Date>]>([
    null,
    null,
  ]);

  const handleApply = () => {
    const [start, end] = dateRange;

    if (start && end) {
      const filterValue = {
        start: start.toISOString(),
        end: end.toISOString(),
      };
      onFilter(filterValue);
    } else {
      onFilter(null);
    }
  };

  const handleClear = () => {
    setDateRange([null, null]);
    onFilter(null);
  };

  return (
    <div className="p-2 bg-gray-800 border border-gray-700 rounded w-56 text-xs">
      <div className="space-y-2">
        <div>
          <label className="text-gray-400 block mb-1 text-[10px]">From:</label>
          <Calendar
            value={dateRange[0]}
            onChange={(e) => setDateRange([e.value as Date, dateRange[1]])}
            showTime
            hourFormat="24"
            dateFormat="dd.mm.yy"
            className="w-full"
            inputClassName="w-full p-1 bg-gray-900 border border-gray-700 rounded text-gray-300 text-[10px] h-6"
            panelClassName="text-xs"
          />
        </div>

        <div>
          <label className="text-gray-400 block mb-1 text-[10px]">To:</label>
          <Calendar
            value={dateRange[1]}
            onChange={(e) => setDateRange([dateRange[0], e.value as Date])}
            showTime
            hourFormat="24"
            dateFormat="dd.mm.yy"
            className="w-full"
            inputClassName="w-full p-1 bg-gray-900 border border-gray-700 rounded text-gray-300 text-[10px] h-6"
            panelClassName="text-xs"
          />
        </div>

        <div className="flex gap-1 pt-1">
          <Button
            label="OK"
            className="p-button-sm p-button-text text-blue-400 hover:text-blue-300 text-[10px] h-6 px-2"
            onClick={handleApply}
          />
          <Button
            label="Clear"
            className="p-button-sm p-button-text text-gray-400 hover:text-gray-300 text-[10px] h-6 px-2"
            onClick={handleClear}
          />
        </div>
      </div>
    </div>
  );
}
