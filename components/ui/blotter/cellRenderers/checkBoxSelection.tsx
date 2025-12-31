"use client";

import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

export type CheckboxSelectionProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
};

export const CheckboxSelection = ({
  checked,
  onChange,
  disabled = false,
  className = "",
  id,
}: CheckboxSelectionProps) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(!!e.checked);
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
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
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

        ${disabled ? "!opacity-50" : ""}
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
