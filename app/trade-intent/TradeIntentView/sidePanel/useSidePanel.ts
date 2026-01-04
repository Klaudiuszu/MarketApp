"use client";

import { useState } from "react";

export const useSidePanel = (
  selectedId: string | null,
  onSelect: (id: string | null) => void
) => {
  const [visible, setVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    onSelect(selectedId === id ? null : id);
  };

  return {
    visible,
    setVisible,
    hoveredButton,
    setHoveredButton,
    handleSelect,
  };
};
