import { LoaderCircle } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-3">
      <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />

      <p className="text-sm text-slate-500">
        Loading tickets...
      </p>
    </div>
  );
}