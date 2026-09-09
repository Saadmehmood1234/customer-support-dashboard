import { Building2, Mail, Phone } from "lucide-react";

import type { Customer } from "../../types/ticket";

interface CustomerInfoProps {
  customer: Customer;
}

export default function CustomerInfo({
  customer,
}: CustomerInfoProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">
        Customer information
      </h3>

      <div className="mt-5 flex items-center gap-3">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-background"
        />

        <div className="min-w-0">
          <p className="font-semibold text-foreground">
            {customer.name}
          </p>

          <p className="text-sm text-muted-foreground">
            {customer.company}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{customer.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>{customer.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{customer.company}</span>
        </div>
      </div>
    </div>
  );
}