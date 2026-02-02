export const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="h-full flex flex-col items-center justify-center text-zinc-500">
    <p>{title}</p>
    <p className="text-sm mt-2">{subtitle}</p>
  </div>
);
