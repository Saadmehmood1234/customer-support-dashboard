import {
  CalendarDays,
  CircleDot,
  Flag,
} from "lucide-react";

import type { Ticket } from "../../types/ticket";

import Badge from "../common/Badge";
import CustomerInfo from "./CustomerInfo";
import Conversation from "./Conversation";

import {
  formatDateTime,
  getPriorityVariant,
  getStatusVariant,
} from "../../utils/ticketUtils";

interface TicketDetailsProps {
  ticket: Ticket;
}

export default function TicketDetails({
  ticket,
}: TicketDetailsProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Ticket #{ticket.id}
            </p>

            <h2 className="mt-1 text-xl font-bold text-foreground">
              {ticket.subject}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {ticket.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Badge variant={getStatusVariant(ticket.status)}>
              <CircleDot className="h-3 w-3" />
              {ticket.status}
            </Badge>

            <Badge variant={getPriorityVariant(ticket.priority)}>
              <Flag className="h-3 w-3" />
              {ticket.priority}
            </Badge>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>
              Created {formatDateTime(ticket.createdAt)}
            </span>
          </div>

          <div className="text-xs text-muted-foreground">
            Updated {formatDateTime(ticket.updatedAt)}
          </div>
        </div>
      </div>

      <CustomerInfo customer={ticket.customer} />

      <Conversation messages={ticket.messages} />
    </div>
  );
}