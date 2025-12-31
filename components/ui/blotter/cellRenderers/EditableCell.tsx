"use client";

import { useEffect, useState } from "react";

type EditableCellProps = {
  value: string;
  rowIndex: number;
  columnId: string;
  updateData: (rowIndex: number, columnId: string, value: string) => void;
};

export const EditableCell = ({
  value,
  rowIndex,
  columnId,
  updateData,
}: EditableCellProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <input
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => updateData(rowIndex, columnId, localValue)}
      className="
        h-full
        w-full
        bg-gray-800
        text-gray-100
        border border-gray-700
        rounded-sm  
        px-2
        text-[12px]
        leading-none
    "
    />
  );
};
