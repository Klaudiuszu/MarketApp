"use client";

import ReactGridLayout, { verticalCompactor } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { GridContainer } from "./GridContainer";
import { useContainerDimensions } from "./hooks/useContainerDimensions";
import { useGridLayout } from "./hooks/useGridLayout";
import {
  DEFAULT_COLS,
  DEFAULT_ROW_HEIGHT,
  getDragConfig,
  getGridConfig,
  getResizeConfig,
} from "./types/constants";
import { DashboardGridProps } from "./types/types";
import { WidgetContainer } from "./WidgetContainer";

/**
 * Main DashboardGrid component
 *
 * A responsive, draggable grid layout for displaying dashboard widgets.
 * Automatically positions widgets and provides drag & drop functionality.
 *
 * @example
 * ```tsx
 * <DashboardGrid
 *   widgets={widgets}
 *   cols={6}
 *   rowHeight={100}
 * />
 * ```
 */
export const DashboardGrid: React.FC<DashboardGridProps> = ({
  widgets,
  cols = DEFAULT_COLS,
  rowHeight = DEFAULT_ROW_HEIGHT,
}) => {
  const { containerRef, dimensions } = useContainerDimensions();
  const layout = useGridLayout(widgets, cols);

  const gridConfig = getGridConfig(cols, rowHeight);
  const dragConfig = getDragConfig();
  const resizeConfig = getResizeConfig();

  return (
    <GridContainer containerRef={containerRef}>
      <ReactGridLayout
        layout={layout}
        width={dimensions.width}
        gridConfig={gridConfig}
        dragConfig={dragConfig}
        resizeConfig={resizeConfig}
        autoSize={true}
        compactor={verticalCompactor}
      >
        {widgets.map((widget) => (
          <WidgetContainer key={widget.id} widgetId={widget.id}>
            {widget.component}
          </WidgetContainer>
        ))}
      </ReactGridLayout>
    </GridContainer>
  );
};

DashboardGrid.displayName = "DashboardGrid";
