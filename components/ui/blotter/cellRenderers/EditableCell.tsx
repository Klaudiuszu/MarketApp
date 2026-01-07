"use client";

import { useEffect, useState } from "react";

type EditableCellProps = {
  value: string | number;
  rowIndex: number;
  columnId: string;
  type?: "text" | "number"; // <-- nowy prop
  updateData: (
    rowIndex: number,
    columnId: string,
    value: string | number
  ) => void;
};

export const EditableCell = ({
  value,
  rowIndex,
  columnId,
  type = "text",
  updateData,
}: EditableCellProps) => {
  const [localValue, setLocalValue] = useState<string | number>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    let newValue: string | number = localValue;

    if (type === "number") {
      const num = Number(localValue);
      newValue = !isNaN(num) ? num : 0;
    }

    updateData(rowIndex, columnId, newValue);
  };

  return (
    <input
      type={type}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      className="
        h-full
        w-full
        bg-gray-800
        text-gray-100
        border border-gray-700
        px-2
        text-[12px]
        leading-none
        focus:outline-none
      "
    />
  );
};
