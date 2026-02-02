import { ReactNode, forwardRef } from "react";
interface WidgetContainerProps {
  widgetId: string;
  children: ReactNode;
}
/**
 * Reusable container for individual dashboard widgets
 * Includes drag handle and consistent styling
 * Uses forwardRef to support react-grid-layout requirements
 */
export const WidgetContainer = forwardRef<HTMLDivElement, WidgetContainerProps>(
  ({ widgetId, children }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col h-full"
      >
        <div className="drag-handle cursor-move p-3 border-b border-zinc-800 bg-zinc-800/50 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">
              {widgetId.toUpperCase()}
            </span>
            <span className="text-xs text-zinc-500" aria-hidden="true">
              ≡
            </span>
          </div>
        </div>
        <div className="flex-1 min-h-0 p-4 overflow-hidden">{children}</div>
      </div>
    );
  },
);

WidgetContainer.displayName = "WidgetContainer";
