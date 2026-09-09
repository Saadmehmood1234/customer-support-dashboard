import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No tickets found",
  description = "Try changing your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Inbox className="h-7 w-7 text-muted-foreground" />
      </div>

      <h3 className="text-base font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}