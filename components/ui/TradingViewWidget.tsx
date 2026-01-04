"use client";

import { memo } from "react";
import { cn } from "../../lib/utils";
import useTradingViewWidget from "../hooks/useTradingViewWidget";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

/**
 * Renders a TradingView widget inside a styled container.
 *
 * @param {string} [title] - Optional title displayed above the widget.
 * @param {string} scriptUrl - The URL of the TradingView widget script to load.
 * @param {Record<string, unknown>} config - Configuration object for the TradingView widget.
 * @param {number} [height=600] - Height of the widget container in pixels.
 * @param {string} [className] - Additional CSS classes for the widget container.
 */
const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}: TradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
      )}
      <div
        className={cn("tradingview-widget-container", className)}
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        />
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
