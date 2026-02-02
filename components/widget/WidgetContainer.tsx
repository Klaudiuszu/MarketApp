import { ReactNode } from "react";

interface WidgetContainerProps {
  widgetId: string;
  children: ReactNode;
}

/**
 * Reusable container for individual dashboard widgets
 * Includes drag handle and consistent styling
 */
export const WidgetContainer = ({
  widgetId,
  children,
}: WidgetContainerProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="drag-handle cursor-move p-3 border-b border-zinc-800 bg-zinc-800/50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            {widgetId.toUpperCase()}
          </span>
          <span className="text-xs text-zinc-500" aria-hidden="true">
            ≡
          </span>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

WidgetContainer.displayName = "WidgetContainer";
