"use client";

import { flexRender, Header } from "@tanstack/react-table";
import ColumnSortButton from "./ColumnSortButton";
import ColumnFilterInput from "./filters/ColumnFilterInput";

export type HeaderCellProps<TData> = {
  header: Header<TData, unknown>;
  isLast: boolean;
  customHeaderRenderers?: Record<string, (header: string) => React.ReactNode>;
};

const HeaderCell = <TData,>({
  header,
  isLast,
  customHeaderRenderers = {},
}: HeaderCellProps<TData>) => {
  if (header.isPlaceholder) return null;

  const columnId = header.column.id;
  const columnSize = header.column.getSize();
  const defaultHeaderContent = flexRender(
    header.column.columnDef.header,
    header.getContext()
  );

  const headerContent = customHeaderRenderers[columnId]
    ? customHeaderRenderers[columnId](defaultHeaderContent as string)
    : defaultHeaderContent;

  const canFilter = header.column.getCanFilter();

  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      className={`h-14 pt-2 border-gray-700 ${
        !isLast ? "border-r border-gray-700" : ""
      }`}
      style={{
        width: columnSize,
        minWidth: header.column.columnDef.minSize,
        maxWidth: header.column.columnDef.maxSize,
      }}
    >
      <div className="h-full flex flex-col gap-2">
        <div className="flex items-center justify-between h-6">
          <div className="px-2 select-none font-medium text-gray-200 text-[11px] leading-tight uppercase tracking-wider truncate">
            {headerContent}
          </div>
          <ColumnSortButton column={header.column} />
        </div>
        <div className="flex-1 flex items-end">
          {canFilter ? (
            <ColumnFilterInput column={header.column} />
          ) : (
            <div className="h-6" />
          )}
        </div>
      </div>
    </th>
  );
};

export default HeaderCell;
