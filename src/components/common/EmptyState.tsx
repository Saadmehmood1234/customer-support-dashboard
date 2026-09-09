import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No tickets found",
  description = "Try changing your search or filters."
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4">
        <Inbox className="h-7 w-7 text-slate-500" />
      </div>

      <h3 className="text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}