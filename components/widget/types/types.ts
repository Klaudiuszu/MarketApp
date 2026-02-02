import { ReactNode } from "react";

/**
 * Configuration for a single widget in the dashboard
 */
export interface WidgetConfig {
  id: string;
  component: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

/**
 * Props for the DashboardGrid component
 */
export interface DashboardGridProps {
  widgets: WidgetConfig[];
  cols?: number;
  rowHeight?: number;
}

/**
 * Represents a single item in the grid layout
 */
export interface GridLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
