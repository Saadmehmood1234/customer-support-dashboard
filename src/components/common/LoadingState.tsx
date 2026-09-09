import Spinner from "./Spinner";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-3">
      <Spinner />

      <p className="text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}