"use client";

import { flexRender, Header } from "@tanstack/react-table";
import ColumnSortButton from "../ui/blotter/ColumnSortButton";
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
      className={`pt-2 pb-0 align-bottom border-b border-gray-700 ${
        !isLast ? "border-r border-gray-700" : ""
      } ${canFilter ? "h-[70px]" : "h-[46px]"} px-0`}
      style={{
        width: `${columnSize}px`,
        minWidth: `${header.column.columnDef.minSize}px`,
        maxWidth: `${header.column.columnDef.maxSize}px`,
      }}
    >
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-between mb-1">
          <div className="select-none font-medium text-gray-200 text-[12px] leading-tight uppercase tracking-wider truncate w-full">
            {headerContent}
          </div>
          <div className="flex items-center ml-1">
            <ColumnSortButton column={header.column} />
          </div>
        </div>
        <div className={`w-full ${canFilter ? "mt-auto" : "hidden"}`}>
          <ColumnFilterInput column={header.column} />
        </div>
      </div>
    </th>
  );
};

export default HeaderCell;
