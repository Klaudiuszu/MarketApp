"use client";

import { ProgressSpinner } from "primereact/progressspinner";

export const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ProgressSpinner
        style={{ width: "60px", height: "60px" }}
        strokeWidth="6px"
        animationDuration="0s"
      />
    </div>
  );
};
