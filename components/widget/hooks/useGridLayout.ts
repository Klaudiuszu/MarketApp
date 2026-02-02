"use client";

import { useCallback } from "react";
import { MIN_WIDGET_HEIGHT, MIN_WIDGET_WIDTH } from "../types/constants";
import { GridLayoutItem, WidgetConfig } from "../types/types";

/**
 * Custom hook to generate grid layout based on widget configurations
 * Places widgets side by side, moving to next row when needed
 */
export const useGridLayout = (
  widgets: WidgetConfig[],
  cols: number,
  initialY: number = 0,
): GridLayoutItem[] => {
  const generateLayout = useCallback((): GridLayoutItem[] => {
    const layout: GridLayoutItem[] = [];
    let currentX = 0;
    let currentY = initialY;
    let maxHeightInCurrentRow = 0;

    widgets.forEach((widget) => {
      const widgetWidth = widget.defaultWidth || MIN_WIDGET_WIDTH;
      const widgetHeight = widget.defaultHeight || MIN_WIDGET_HEIGHT;

      if (currentX + widgetWidth > cols) {
        currentY += maxHeightInCurrentRow;
        currentX = 0;
        maxHeightInCurrentRow = 0;
      }

      const item: GridLayoutItem = {
        i: widget.id,
        x: currentX,
        y: currentY,
        w: widgetWidth,
        h: widgetHeight,
      };

      layout.push(item);

      currentX += widgetWidth;
      maxHeightInCurrentRow = Math.max(maxHeightInCurrentRow, widgetHeight);
    });

    return layout;
  }, [widgets, cols, initialY]);

  return generateLayout();
};
