"use client";

import ReactGridLayout, { verticalCompactor } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Key } from "react";
import { GridContainer } from "../widget/GridContainer";
import { WidgetContainer } from "./WidgetContainer";
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

/**
 * Main DashboardGrid component
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
        {widgets.map(
          (widget: { id: Key | null | undefined; component: any }) => (
            <div key={widget.id} data-grid={{}}>
              <WidgetContainer widgetId={widget.id as string}>
                {widget.component}
              </WidgetContainer>
            </div>
          ),
        )}
      </ReactGridLayout>
    </GridContainer>
  );
};

DashboardGrid.displayName = "DashboardGrid";
