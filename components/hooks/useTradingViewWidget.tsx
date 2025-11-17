"use client";
import { useEffect, useMemo, useRef } from "react";

/**
 * useTradingViewWidget
 *
 * Hook that initializes and manages a TradingView external widget inside a
 * container element. It creates a wrapper div for the widget and injects the
 * TradingView embed script (using the provided `scriptUrl`) with the supplied
 * configuration. The hook performs safe script insertion, installs load/error
 * handlers and cleans up injected DOM when the component unmounts or when the
 * `scriptUrl`/`config`/`height` change.
 *
 * Key behaviors:
 * - Memoizes `config` (serialized) to avoid unnecessary reloads when the
 *   config object identity changes but content is the same.
 * - Uses `textContent` for the script payload to reduce HTML parsing/XSS risks.
 * - Attaches `onload`/`onerror` handlers to detect success/failure and
 *   maintain a `data-*` state on the container for deduplication.
 * - Removes the specific injected `<script>` element during cleanup instead
 *   of only clearing `innerHTML`.
 *
 * @param {string} scriptUrl - Absolute or relative URL of the TradingView embed script (e.g. `.../embed-widget-market-overview.js`).
 * @param {Record<string, unknown>} config - Plain object with TradingView widget configuration; will be serialized to JSON and passed to the embed script.
 * @param {number} [height=600] - Height of the widget container in pixels.
 *
 * @returns {React.RefObject<HTMLDivElement | null>} A ref to attach to a container `<div>` where the widget will be mounted.
 *
 * @example
 * const containerRef = useTradingViewWidget(
 *   'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
 *   MARKET_OVERVIEW_WIDGET_CONFIG,
 *   600
 * );
 * return <div ref={containerRef} />;
 *
 * @remarks
 * - The hook writes small metadata into the container's `dataset` (`loaded`, `config`, `src`) to avoid redundant initialization.
 * - The hook logs script loading errors to the console and marks the container
 *   as `data-loaded="error"` so caller can retry or handle failure cases.
 */
const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptElRef = useRef<HTMLScriptElement | null>(null);

  // Memoize serialized config to avoid effect re-running on object identity changes
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const alreadyLoaded = container.dataset.loaded === "true";
    const prevConfig = container.dataset.config;
    const prevSrc = container.dataset.src;

    // If the same script and config are already loaded, do nothing
    if (alreadyLoaded && prevConfig === configString && prevSrc === scriptUrl) {
      return;
    }

    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.width = "100%";
    widgetDiv.style.height = `${height}px`;
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;

    script.textContent = configString;

    script.onload = () => {
      if (!container) return;
      container.dataset.loaded = "true";
      container.dataset.config = configString;
      container.dataset.src = scriptUrl;
    };

    script.onerror = (e) => {
      if (container) container.dataset.loaded = "error";
      // eslint-disable-next-line no-console
      console.error("TradingView widget script failed to load:", scriptUrl, e);
    };

    container.appendChild(script);
    scriptElRef.current = script;

    return () => {
      // Cleanup: remove script element and container contents, reset dataset
      if (scriptElRef.current && scriptElRef.current.parentNode) {
        scriptElRef.current.parentNode.removeChild(scriptElRef.current);
        scriptElRef.current = null;
      }
      if (container) {
        container.innerHTML = "";
        delete container.dataset.loaded;
        delete container.dataset.config;
        delete container.dataset.src;
      }
    };
  }, [scriptUrl, configString, height]);

  return containerRef;
};
export default useTradingViewWidget;
