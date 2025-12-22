export const DEFAULT_STORAGE_KEY = "blotter_column_order";

export interface ColumnOrderStorage {
  saveColumnOrder: (columnOrder: string[], key?: string) => void;
  getSavedColumnOrder: (key?: string) => string[] | null;
  removeSavedColumnOrder: (key?: string) => void;
}

export const columnOrderStorage: ColumnOrderStorage = {
  saveColumnOrder: (
    columnOrder: string[],
    key: string = DEFAULT_STORAGE_KEY
  ) => {
    try {
      localStorage.setItem(key, JSON.stringify(columnOrder));
    } catch (error) {
      console.error("Failed to save column order to localStorage:", error);
    }
  },

  getSavedColumnOrder: (key: string = DEFAULT_STORAGE_KEY): string[] | null => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to get column order from localStorage:", error);
      return null;
    }
  },

  removeSavedColumnOrder: (key: string = DEFAULT_STORAGE_KEY) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to remove column order from localStorage:", error);
    }
  },
};
