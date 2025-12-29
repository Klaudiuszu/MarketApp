"use client";

import { flexRender, Header } from "@tanstack/react-table";
import ColumnSortButton from "./ColumnSortButton";
import ColumnFilterInput from "./filters/ColumnFilterInput";

export type HeaderCellProps<TData> = {
  header: Header<TData, unknown>;
  isLast: boolean;
  customHeaderRenderers?: Record<string, (header: string) => React.ReactNode>;
};
/**
 * HeaderCell - Individual header cell component with filter and sort controls
 */
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
      className={`py-1 border-gray-700 ${
        !isLast ? "border-r border-gray-700" : ""
      } ${canFilter ? "h-14" : "h-8"}`}
      style={{
        width: columnSize,
        minWidth: header.column.columnDef.minSize,
        maxWidth: header.column.columnDef.maxSize,
      }}
    >
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-between mb-0.5">
          <div className="select-none font-medium text-gray-200 text-[11px] leading-tight uppercase tracking-wider truncate w-full">
            {headerContent}
          </div>
          <ColumnSortButton column={header.column} />
        </div>
        <div className={`w-full ${canFilter ? "mt-auto" : "hidden"}`}>
          <ColumnFilterInput column={header.column} />
        </div>
      </div>
    </th>
  );
};

export default HeaderCell;
