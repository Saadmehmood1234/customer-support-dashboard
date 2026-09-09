interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconClassName: string;
}

export default function StatsCard({
  label,
  value,
  icon,
  iconClassName
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`rounded-lg p-2.5 ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}