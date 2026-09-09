import {
  ChevronRight
} from "lucide-react";

import type { Ticket } from "../../types/ticket";


import Badge from "../common/Badge";
import StatusSelect from "./StatusSelect";
import { formatDate, getPriorityClasses, getStatusClasses } from "../../utils/ticketUtils";

interface TicketRowProps {
  ticket: Ticket;
  onOpen: () => void;
  onStatusChange: (
    status: Ticket["status"]
  ) => void;
}

export default function TicketRow({
  ticket,
  onOpen,
  onStatusChange
}: TicketRowProps) {
  return (
    <tr
      onClick={onOpen}
      className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
    >
      <td className="px-4 py-4">
        <div className="flex min-w-[210px] items-center gap-3">
          <img
            src={ticket.customer.avatar}
            alt={ticket.customer.name}
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {ticket.customer.name}
            </p>

            <p className="truncate text-xs text-slate-500">
              {ticket.customer.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="min-w-[220px]">
          <p className="text-sm font-medium text-slate-900">
            {ticket.subject}
          </p>

          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {ticket.description}
          </p>
        </div>
      </td>

      <td className="px-4 py-4">
        <Badge
          className={getPriorityClasses(
            ticket.priority
          )}
        >
          {ticket.priority}
        </Badge>
      </td>

      <td className="px-4 py-4">
        <div
          className="flex items-center gap-2"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <Badge
            className={getStatusClasses(
              ticket.status
            )}
          >
            {ticket.status}
          </Badge>

          <StatusSelect
            status={ticket.status}
            onChange={onStatusChange}
          />
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
        {formatDate(ticket.createdAt)}
      </td>

      <td className="px-4 py-4 text-right">
        <button
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Open ticket"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}