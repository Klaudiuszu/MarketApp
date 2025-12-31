"use client";

import { CellContext } from "@tanstack/react-table";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type Option = {
  label: string;
  value: string;
};

type DropdownEditableCellProps<TData> = {
  ctx: CellContext<TData, unknown>;
  options: Option[];
  placeholder?: string;
};

export function DropdownEditableCell<TData>({
  ctx,
  options,
  placeholder = "Select",
}: DropdownEditableCellProps<TData>) {
  const { getValue, row, column, table } = ctx;
  const value = getValue() as string | null;

  return (
    <Dropdown
      value={value}
      options={options}
      placeholder={placeholder}
      onChange={(e: DropdownChangeEvent) => {
        table.options.meta?.updateData(row.index, column.id, e.value);
      }}
      className="blotter-dropdown w-full"
      panelClassName="blotter-dropdown-panel"
      itemTemplate={(option: Option) => (
        <div className="blotter-dropdown-item">{option.label}</div>
      )}
    />
  );
}
