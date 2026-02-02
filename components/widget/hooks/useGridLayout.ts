import { useCallback } from "react";
import { MIN_WIDGET_HEIGHT, MIN_WIDGET_WIDTH } from "../types/constants";
import { GridLayoutItem, WidgetConfig } from "../types/types";

/**
 * Custom hook to generate grid layout based on widget configurations
 * Automatically positions widgets in a two-column pattern
 */
export const useGridLayout = (
  widgets: WidgetConfig[],
  cols: number,
  initialY: number = 0,
): GridLayoutItem[] => {
  const generateLayout = useCallback((): GridLayoutItem[] => {
    let currentY = initialY;

    return widgets.map((widget, index) => {
      const isEvenIndex = index % 2 === 0;
      const xPosition = isEvenIndex ? 0 : cols / 2;

      const item: GridLayoutItem = {
        i: widget.id,
        x: xPosition,
        y: currentY,
        w: widget.defaultWidth || MIN_WIDGET_WIDTH,
        h: widget.defaultHeight || MIN_WIDGET_HEIGHT,
      };

      if (!isEvenIndex) {
        currentY += item.h;
      }

      return item;
    });
  }, [widgets, cols, initialY]);

  return generateLayout();
};
