import { ReactNode } from "react";
import { ApiStatus } from "../../../../components/ui/blotter/constants";
import { INewIssueType } from "../../../../lib/schemas/NewIssueSchema";

export interface SidePanelProps {
  title: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  status?: ApiStatus;
  data: INewIssueType[];
  children?: ReactNode;
  footerContent?: ReactNode;
  className?: string;
  loading?: boolean;
}
