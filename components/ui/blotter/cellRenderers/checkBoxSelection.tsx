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
      className={`inline-flex items-center justify-center w-full ${className}`}
    >
      <Checkbox
        inputId={id}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="m-0! h-1"
        pt={{
          root: {
            className: `
              !w-5 !h-5 !m-0
              !border
              !rounded
              transition-all duration-200 ease-in-out
              ${
                checked
                  ? "!border-blue-400 !bg-gray-700"
                  : "!border-gray-400 !bg-gray-700 hover:!border-gray-300"
              }
              ${disabled ? "!opacity-50 !cursor-not-allowed" : ""}
            `,
          },
          box: {
            className: `
              !w-4 !h-4
              !flex !items-center !justify-center
              !bg-transparent
            `,
          },
          icon: {
            className: `
              !w-3 !h-3
              !text-blue-300
            `,
          },
          input: {
            className: `
              !hidden
            `,
          },
        }}
      />
    </div>
  );
};
