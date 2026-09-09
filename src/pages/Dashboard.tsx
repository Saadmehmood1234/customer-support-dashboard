import { useEffect } from "react";

import {
  CheckCircle2,
  CircleDot,
  Clock3,
  Inbox,
} from "lucide-react";

import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

import {
  loadTickets,
  setSelectedTicket,
  updateTicketStatus,
} from "../features/tickets/ticketsSlice";

import type {
  Ticket,
} from "../types/ticket";

import StatsCard from "../components/dashboard/StatsCard";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

import Badge from "../components/common/Badge";
import { formatDate, getFilteredTickets, getPriorityVariant, getStatusCount } from "../utils/ticketUtils";
import type { TableColumn } from "../components/dashboard/Table.tsx";
import Table from "../components/dashboard/Table.tsx";
import StatusEditor from "../components/dashboard/StatusEditor.tsx";
import TicketFilters from "../components/dashboard/TicketFilters.tsx";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const {
    tickets,
    loading,
    error,
    search,
    statusFilter,
    priorityFilter,
  } = useAppSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

  const openCount = getStatusCount(
    tickets,
    "Open"
  );

  const inProgressCount = getStatusCount(
    tickets,
    "In Progress"
  );

  const resolvedCount = getStatusCount(
    tickets,
    "Resolved"
  );

  const filteredTickets = getFilteredTickets(
    tickets,
    search,
    statusFilter,
    priorityFilter
  );

  const ticketColumns: TableColumn<Ticket>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (ticket) => (
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
      ),
    },

    {
      key: "issue",
      header: "Issue",
      render: (ticket) => (
        <div className="max-w-90">
          <p className="truncate text-sm font-medium text-foreground">
            {ticket.subject}
          </p>

          <p className="mt-1 truncate text-xs text-muted-foreground">
            #{ticket.id} · {ticket.description}
          </p>
        </div>
      ),
    },

    {
      key: "priority",
      header: "Priority",
      render: (ticket) => (
        <Badge
          variant={getPriorityVariant(
            ticket.priority
          )}
        >
          {ticket.priority}
        </Badge>
      ),
    },

   {
  key: "status",
  header: "Status",
  className: "w-[220px]",
  render: (ticket) => (
    <StatusEditor
      status={ticket.status}
      onChange={(status) => {
        dispatch(
          updateTicketStatus({
            id: ticket.id,
            status,
          })
        );
      }}
    />
  ),
},

    {
      key: "created",
      header: "Created",
      className: "whitespace-nowrap",
      render: (ticket) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(ticket.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <main className="min-w-0 flex-1 bg-background">
      <div className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-primary">
            Support center
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Customer Support
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and respond to customer support tickets.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Total Tickets"
            value={tickets.length}
            icon={
              <Inbox className="h-5 w-5" />
            }
            iconClassName="bg-primary/10 text-primary"
          />

          <StatsCard
            label="Open"
            value={openCount}
            icon={
              <CircleDot className="h-5 w-5" />
            }
            iconClassName="bg-info-muted text-info"
          />

          <StatsCard
            label="In Progress"
            value={inProgressCount}
            icon={
              <Clock3 className="h-5 w-5" />
            }
            iconClassName="bg-accent text-accent-foreground"
          />

          <StatsCard
            label="Resolved"
            value={resolvedCount}
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            iconClassName="bg-success-muted text-success"
          />
        </div>
        <section className="card mt-6 overflow-hidden">
          <div className="flex flex-col gap-1 border-b border-border px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold text-foreground">
                Support tickets
              </h2>

              <p className="mt-0.5 text-xs text-muted-foreground">
                View and manage customer issues.
              </p>
            </div>

            <p className="text-xs font-medium text-muted-foreground">
              {filteredTickets.length} of{" "}
              {tickets.length} tickets
            </p>
          </div>

          <TicketFilters/>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={() =>
                dispatch(loadTickets())
              }
            />
          ) : (
            <Table
              data={filteredTickets}
              columns={ticketColumns}
              getRowKey={(ticket) => ticket.id}
              onRowClick={(ticket) =>
                dispatch(
                  setSelectedTicket(ticket.id)
                )
              }
              className="min-w-225"
            />
          )}
        </section>
      </div>
    </main>
  );
}