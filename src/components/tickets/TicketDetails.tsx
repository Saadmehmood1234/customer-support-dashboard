import {
  CalendarDays,
  CircleDot,
  Flag
} from "lucide-react";

import type { Ticket } from "../../types/ticket";


import Badge from "../common/Badge";
import CustomerInfo from "./CustomerInfo";
import Conversation from "./Conversation";
import { formatDateTime, getPriorityClasses, getStatusClasses } from "../../utils/ticketUtils";

interface TicketDetailsProps {
  ticket: Ticket;
}

export default function TicketDetails({
  ticket
}: TicketDetailsProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Ticket #{ticket.id}
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {ticket.subject}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {ticket.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              className={getStatusClasses(
                ticket.status
              )}
            >
              <CircleDot className="mr-1.5 h-3 w-3" />
              {ticket.status}
            </Badge>

            <Badge
              className={getPriorityClasses(
                ticket.priority
              )}
            >
              <Flag className="mr-1.5 h-3 w-3" />
              {ticket.priority}
            </Badge>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Created {formatDateTime(ticket.createdAt)}
          </div>

          <div className="text-xs text-slate-500">
            Updated {formatDateTime(ticket.updatedAt)}
          </div>
        </div>
      </div>

      <CustomerInfo customer={ticket.customer} />

      <Conversation messages={ticket.messages} />
    </div>
  );
}