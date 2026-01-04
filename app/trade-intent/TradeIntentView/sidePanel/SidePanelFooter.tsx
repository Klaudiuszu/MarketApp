"use client";

import { ReactNode } from "react";

interface Props {
  footerContent?: ReactNode;
  count: number;
}

export const SidePanelFooter = ({ footerContent, count }: Props) => (
  <div className="shrink-0 border-t border-gray-800 px-3 py-2">
    {footerContent ?? (
      <div className="text-xs text-gray-500 text-center">
        {count} issues • Trading Desk
      </div>
    )}
  </div>
);
