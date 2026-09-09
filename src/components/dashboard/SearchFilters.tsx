import { Search, SlidersHorizontal, X } from "lucide-react";
import type { ReactNode } from "react";

export interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: ReactNode;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export default function SearchFilters({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  hasFilters = false,
  onClearFilters,
}: SearchFiltersProps) {
  return (
    <div className="border-b border-border p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="
              h-10
              w-full
              rounded-lg
              border
              border-input
              bg-card
              pl-10
              pr-3
              text-sm
              text-foreground
              shadow-sm
              outline-none
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-3
              focus:ring-primary/10
            "
          />
        </div>
        {filters && (
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal
              aria-hidden="true"
              className="hidden h-4 w-4 text-muted-foreground sm:block"
            />

            {filters}

            {hasFilters && onClearFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  px-3
                  text-sm
                  font-medium
                  text-muted-foreground
                  transition-colors
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}