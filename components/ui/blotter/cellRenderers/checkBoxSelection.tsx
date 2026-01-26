"use client";

import { Row } from "@tanstack/react-table";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

export type CheckboxSelectionProps<TData = Record<string, unknown>> = {
  row: Row<TData>;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  disablePropertyName?: string;
};

export const CheckboxSelection = <TData = Record<string, unknown>,>({
  row,
  checked,
  onChange,
  disabled,
  className = "",
  id,
  disablePropertyName = "isDisabled",
}: CheckboxSelectionProps<TData>) => {
  const isDisabledFromData =
    ((row.original as Record<string, unknown>)[
      disablePropertyName
    ] as boolean) || false;
  const isDisabled: boolean =
    disabled !== undefined ? disabled : isDisabledFromData;

  const isChecked = checked !== undefined ? checked : row.getIsSelected();
  const handleChange = onChange || row.toggleSelected;

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    if (!isDisabled) {
      handleChange(!!e.checked);
    }
  };

  return (
    <div
      className={`
        flex items-center justify-center
        h-full w-full
        ${className}
      `}
    >
      <Checkbox
        inputId={id}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleCheckboxChange}
        pt={{
          root: {
            className: `
        !m-0 !p-0
        flex items-center justify-center
      `,
          },
          box: {
            className: `
        !w-[14px] !h-[14px]
        !border !rounded-[3px]
        transition-colors duration-150

        border-gray-500 bg-gray-800
        hover:border-gray-400

        data-[p-highlight=true]:!border-blue-500
        data-[p-highlight=true]:!bg-blue-500

        ${isDisabled ? "!opacity-50" : ""}
      `,
          },
          icon: {
            className: `
        !w-[10px] !h-[10px]
        !text-white !stroke-2
      `,
          },
        }}
      />
    </div>
  );
};
