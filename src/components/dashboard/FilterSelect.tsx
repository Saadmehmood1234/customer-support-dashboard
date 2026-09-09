interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
}

export default function FilterSelect({
  value,
  onChange,
  options,
  className = "",
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`
        h-10
        min-w-32
        cursor-pointer
        rounded-lg
        border
        border-input
        bg-card
        px-3
        text-sm
        text-foreground
        outline-none
        transition-colors
        hover:border-primary/40
        focus:border-primary
        focus:ring-3
        focus:ring-primary/10
        ${className}
      `}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}