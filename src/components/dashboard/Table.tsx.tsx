import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  className?: string;
  headerClassName?: string;
  render: (row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  getRowKey: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
  className?: string;
}

export default function Table<T>({
  data,
  columns,
  getRowKey,
  onRowClick,
  emptyState,
  className = "",
}: TableProps<T>) {
  if (!data.length) {
    return emptyState ?? null;
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className={`w-full text-left ${className}`}>
          <thead>
            <tr className="border-b border-border bg-muted/60">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-5 py-3
                    text-xs font-semibold uppercase tracking-wide
                    text-muted-foreground
                    ${column.headerClassName ?? ""}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr
                key={getRowKey(row)}
                onClick={() => onRowClick?.(row)}
                className={`
                  bg-card
                  transition-colors
                  hover:bg-muted/40
                  ${onRowClick ? "cursor-pointer" : ""}
                `}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-4 ${column.className ?? ""}`}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}