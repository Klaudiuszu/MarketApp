"use client";

interface TitleSectionProps {
  title: string;
  status: React.ReactNode;
  children?: React.ReactNode;
}

export function TitleSection({ title, status, children }: TitleSectionProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1.5">{status}</div>
      <div className="h-4 w-px bg-gray-700" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-200">{title}</span>
        {children}
      </div>
    </div>
  );
}
