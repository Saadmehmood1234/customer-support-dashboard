import { ArrowLeft, Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-5 text-7xl font-bold tracking-tight text-muted-foreground/20">
          404
        </div>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <SearchX className="h-7 w-7" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-primary"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}