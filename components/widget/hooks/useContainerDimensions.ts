import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to measure container dimensions with ResizeObserver
 * Returns the container ref and current dimensions
 */
export const useContainerDimensions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 1200,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const { clientWidth, clientHeight } = containerRef.current;

      setDimensions({
        width: Math.max(0, clientWidth - 32),
        height: Math.max(0, clientHeight - 32),
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return { containerRef, dimensions };
};
