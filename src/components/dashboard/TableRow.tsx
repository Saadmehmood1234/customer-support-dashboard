import {
  ChevronRight,
} from "lucide-react";

import type {
  Ticket,
  TicketStatus,
} from "../../types/ticket";


import Badge from "../common/Badge";
import { formatDate, getPriorityVariant, getStatusVariant } from "../../utils/ticketUtils";

interface TicketRowProps {
  ticket: Ticket;
  onOpen: () => void;
  onStatusChange: (status: TicketStatus) => void;
}

export default function TicketRow({
  ticket,
  onOpen,
}: TicketRowProps) {
  return (
    <tr
      onClick={onOpen}
      className="
        group
        cursor-pointer
        bg-card
        transition-colors
        hover:bg-muted/40
      "
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={ticket.customer.avatar}
            alt={ticket.customer.name}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-background"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {ticket.customer.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {ticket.customer.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="max-w-90">
          <p className="truncate text-sm font-medium text-foreground">
            {ticket.subject}
          </p>

          <p className="mt-1 truncate text-xs text-muted-foreground">
            #{ticket.id} · {ticket.description}
          </p>
        </div>
      </td>
      <td className="px-5 py-4">
        <Badge variant={getPriorityVariant(ticket.priority)}>
          {ticket.priority}
        </Badge>
      </td>
      <td className="px-5 py-4">
        <Badge variant={getStatusVariant(ticket.status)}>
          {ticket.status}
        </Badge>
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">
        {formatDate(ticket.createdAt)}
      </td>
      <td className="px-5 py-4">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          aria-label={`Open ticket ${ticket.id}`}
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg
            text-muted-foreground
            opacity-0
            transition
            group-hover:opacity-100
            hover:bg-muted
            hover:text-foreground
            focus-visible:opacity-100
          "
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}