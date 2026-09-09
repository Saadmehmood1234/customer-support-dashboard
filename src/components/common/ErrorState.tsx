import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-destructive-muted p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>

      <h3 className="text-base font-semibold text-foreground">
        Something went wrong
      </h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="btn btn-primary mt-5"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}