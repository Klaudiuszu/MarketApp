import { Table } from "@tanstack/react-table";
import { useEffect } from "react";
import { columnOrderStorage } from "../../lib/utils/columnOrderStorage";

interface UseColumnOrderOptions {
  storageKey?: string;
  onOrderChange?: (order: string[]) => void;
}

export function useColumnOrder<T>(
  table: Table<T> | undefined,
  options: UseColumnOrderOptions = {}
) {
  const { storageKey, onOrderChange } = options;

  useEffect(() => {
    if (!table) return;

    const savedOrder = columnOrderStorage.getSavedColumnOrder(storageKey);
    if (savedOrder && savedOrder.length > 0) {
      const allColumnIds = table.getAllColumns().map((col) => col.id);
      const validSavedOrder = savedOrder.filter((id) =>
        allColumnIds.includes(id)
      );
      const missingColumns = allColumnIds.filter(
        (id) => !validSavedOrder.includes(id)
      );
      const finalOrder = [...validSavedOrder, ...missingColumns];

      table.setColumnOrder(finalOrder);
    }
  }, [table, storageKey]);

  const handleColumnOrderChange = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    if (!table) return;

    const leafColumns = table.getAllLeafColumns();
    const columnIds = leafColumns.map((col) => col.id);

    const [removed] = columnIds.splice(sourceIndex, 1);
    columnIds.splice(destinationIndex, 0, removed);

    table.setColumnOrder(columnIds);
    columnOrderStorage.saveColumnOrder(columnIds, storageKey);

    onOrderChange?.(columnIds);
  };

  const handleResetOrder = () => {
    if (!table) return;

    const defaultOrder = table.getAllColumns().map((col) => col.id);
    table.setColumnOrder(defaultOrder);
    columnOrderStorage.removeSavedColumnOrder(storageKey);
  };

  return {
    handleColumnOrderChange,
    handleResetOrder,
  };
}
