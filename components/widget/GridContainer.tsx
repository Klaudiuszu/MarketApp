import { ReactNode, RefObject } from "react";

interface GridContainerProps {
  containerRef: RefObject<HTMLDivElement>;
  children: ReactNode;
}

/**
 * Container component for the grid layout
 * Provides background and full-screen sizing
 */
export const GridContainer = ({
  containerRef,
  children,
}: GridContainerProps) => {
  return (
    <div ref={containerRef} className="h-full w-full bg-black p-4">
      {children}
    </div>
  );
};

GridContainer.displayName = "GridContainer";
