import type {
  Ticket,
  TicketPriority,
  TicketStatus
} from "../types/ticket";

export function getFilteredTickets(
  tickets: Ticket[],
  search: string,
  statusFilter: TicketStatus | "All",
  priorityFilter: string
) {
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  return tickets.filter((ticket) => {
    const matchesSearch =
      !normalizedSearch ||
      ticket.customer.name
        .toLowerCase()
        .includes(normalizedSearch) ||
      ticket.subject
        .toLowerCase()
        .includes(normalizedSearch) ||
      ticket.customer.email
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      ticket.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });
}

export function getStatusCount(
  tickets: Ticket[],
  status: TicketStatus
) {
  return tickets.filter(
    (ticket) => ticket.status === status
  ).length;
}

export function getPriorityClasses(
  priority: TicketPriority
) {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-700 border-red-200";

    case "Medium":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "Low":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
}

export function getStatusClasses(
  status: TicketStatus
) {
  switch (status) {
    case "Open":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "In Progress":
      return "bg-violet-50 text-violet-700 border-violet-200";

    case "Resolved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

export function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(date));
}