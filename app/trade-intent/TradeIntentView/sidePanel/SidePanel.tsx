"use client";

import { Loader } from "../../../../components/ui/blotter/Loader";
import { ApiStatus } from "../../../../components/ui/blotter/constants";
import { PortfolioBlotterDialog } from "../../../trade-intent/dialogs/portfolioDialog/PortfolioBlotterDialog";

import { SidePanelFooter } from "./SidePanelFooter";
import { SidePanelHeader } from "./SidePanelHeader";
import { SidePanelList } from "./SidePanelList";
import { SidePanelProps } from "./types";
import { useSidePanel } from "./useSidePanel";

export default function SidePanel({
  title,
  selectedId,
  onSelect,
  status = ApiStatus.ONLINE,
  data = [],
  children,
  footerContent,
  className = "",
  loading = false,
}: SidePanelProps) {
  const { visible, setVisible, hoveredButton, setHoveredButton, handleSelect } =
    useSidePanel(selectedId, onSelect);

  return (
    <aside
      className={`flex flex-col h-full bg-gray-900 border border-gray-700 ${className}`}
    >
      <SidePanelHeader title={title} status={status} />

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <Loader />
        ) : children ? (
          children
        ) : data.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-8">
            No issues
          </div>
        ) : (
          <SidePanelList
            data={data}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreateOrder={() => setVisible(true)}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
          />
        )}
      </div>

      <SidePanelFooter footerContent={footerContent} count={data.length} />

      <PortfolioBlotterDialog
        visible={visible}
        onClose={() => setVisible(false)}
        onContinue={() => console.log("Portfolio selected")}
      />
    </aside>
  );
}
