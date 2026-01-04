"use client";

import { INewIssueType } from "../../../../lib/schemas/NewIssueSchema";
import { SidePanelItem } from "./SidePanelItem";

interface Props {
  data: INewIssueType[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreateOrder: () => void;
  hoveredButton: string | null;
  setHoveredButton: (id: string | null) => void;
}

export const SidePanelList = ({
  data,
  selectedId,
  onSelect,
  onCreateOrder,
  hoveredButton,
  setHoveredButton,
}: Props) => (
  <div className="p-2 space-y-2">
    {data.map((item, index) => (
      <div key={item.id ?? index} className="space-y-2">
        <SidePanelItem
          item={item}
          selected={selectedId === item.id}
          onSelect={() => onSelect(item.id)}
          onCreateOrder={onCreateOrder}
          hovered={hoveredButton === item.id}
          onHover={(v) => setHoveredButton(v ? item.id : null)}
        />
        {index < data.length - 1 && <div className="h-px bg-gray-800" />}
      </div>
    ))}
  </div>
);
