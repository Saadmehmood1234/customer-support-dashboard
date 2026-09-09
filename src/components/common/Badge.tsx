import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-border bg-muted text-muted-foreground",
  primary: "border-primary/20 bg-primary/10 text-primary",
  success: "border-success/20 bg-success-muted text-success",
  warning: "border-warning/20 bg-warning-muted text-warning",
  danger: "border-destructive/20 bg-destructive-muted text-destructive",
  info: "border-info/20 bg-info-muted text-info",
  neutral: "border-border bg-muted text-muted-foreground",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        border
        px-2.5 py-1
        text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}