/**
 * Default configuration values for the DashboardGrid
 */
export const DEFAULT_COLS = 6;
export const DEFAULT_ROW_HEIGHT = 100;
export const DEFAULT_CONTAINER_PADDING = 32;
export const MIN_WIDGET_WIDTH = 3;
export const MIN_WIDGET_HEIGHT = 4;

/**
 * Grid configuration for react-grid-layout
 * @note Uses proper GridConfig type from react-grid-layout
 */
export const getGridConfig = (cols: number, rowHeight: number) => ({
  cols, // This must be a number, not an object
  rowHeight,
  margin: [10, 10] as [number, number],
  containerPadding: [0, 0] as [number, number],
});

/**
 * Drag configuration for react-grid-layout
 */
export const getDragConfig = () => ({
  enabled: true,
  handle: ".drag-handle" as const,
  threshold: 3,
});

/**
 * Resize configuration for react-grid-layout
 */
export const getResizeConfig = () => ({
  enabled: true,
});
