"use client";

import BlotterControlBar from "../../../../components/ui/blotter/BlotterControlBar";
import { ApiStatus } from "../../../../components/ui/blotter/constants";

interface Props {
  title: string;
  status: ApiStatus;
}

export const SidePanelHeader = ({ title, status }: Props) => (
  <div className="bg-gray-900 border-b border-gray-700 overflow-hidden">
    <BlotterControlBar title={title} status={status} />
  </div>
);
