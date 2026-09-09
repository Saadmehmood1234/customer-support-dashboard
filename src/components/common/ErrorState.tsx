import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({
  message,
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-red-50 p-3">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>

      <h3 className="text-base font-semibold text-slate-900">
        Something went wrong
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}