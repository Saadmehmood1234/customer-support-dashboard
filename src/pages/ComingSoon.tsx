import { ArrowLeft, Clock3, Settings, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

export default function ComingSoon({
  title = "Settings",
  description = "We're working on this section. Settings will be available soon.",
  icon: Icon = Settings,
}: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon className="h-7 w-7" />
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-warning/20 bg-warning-muted px-3 py-1 text-xs font-medium text-warning">
          <Clock3 className="h-3.5 w-3.5" />
          Coming soon
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-7 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}
