"use client";
import { useEffect, useRef } from "react";

/**
 * React hook for embedding a TradingView widget into a container element.
 *
 * @param {string} scriptUrl - The URL of the TradingView widget script to load.
 * @param {Record<string, unknown>} config - Configuration object for the TradingView widget.
 * @param {number} [height=600] - Height of the widget container in pixels.
 * @returns {React.RefObject<HTMLDivElement | null>} Ref to the container div for the widget.
 */
const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;
    containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};
export default useTradingViewWidget;
