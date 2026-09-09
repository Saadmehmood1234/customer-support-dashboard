import {
  Building2,
  Mail,
  Phone
} from "lucide-react";

import type { Customer } from "../../types/ticket";

interface CustomerInfoProps {
  customer: Customer;
}

export default function CustomerInfo({
  customer
}: CustomerInfoProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">
        Customer information
      </h3>

      <div className="mt-5 flex items-center gap-3">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <p className="font-semibold text-slate-900">
            {customer.name}
          </p>

          <p className="text-sm text-slate-500">
            {customer.company}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Mail className="h-4 w-4 text-slate-400" />
          {customer.email}
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Phone className="h-4 w-4 text-slate-400" />
          {customer.phone}
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Building2 className="h-4 w-4 text-slate-400" />
          {customer.company}
        </div>
      </div>
    </div>
  );
}