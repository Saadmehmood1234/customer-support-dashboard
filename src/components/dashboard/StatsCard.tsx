import type { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  iconClassName: string;
}

export default function StatsCard({
  label,
  value,
  icon,
  iconClassName,
}: StatsCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>

        <div className={`rounded-lg p-2.5 ${iconClassName}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}