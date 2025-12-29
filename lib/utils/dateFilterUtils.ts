export const dateFilterFn = (row: any, columnId: string, filterValue: any) => {
  const cellValue = row.getValue(columnId);
  if (!cellValue || !filterValue) return true;

  try {
    const cellDate = new Date(cellValue);

    if (filterValue.start && filterValue.end) {
      const startDate = new Date(filterValue.start);
      const endDate = new Date(filterValue.end);
      return cellDate >= startDate && cellDate <= endDate;
    } else if (filterValue.start) {
      const startDate = new Date(filterValue.start);
      return cellDate >= startDate;
    } else if (filterValue.end) {
      const endDate = new Date(filterValue.end);
      return cellDate <= endDate;
    }

    return true;
  } catch (error) {
    return true;
  }
};
