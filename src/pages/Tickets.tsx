import { Inbox, SlidersHorizontal, Ticket as TicketIcon } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  loadTickets,
  setSelectedTicket,
} from "../features/tickets/ticketsSlice";

import type { Ticket } from "../types/ticket";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import { type TableColumn } from "../components/dashboard/Table.tsx";
import Badge from "../components/common/Badge";
import {
  formatDate,
  getFilteredTickets,
  getPriorityVariant,
  getStatusVariant,
} from "../utils/ticketUtils";
import Table from "../components/dashboard/Table.tsx";
import { useEffect, useMemo } from "react";
import TicketFilters from "../components/dashboard/TicketFilters.tsx";

export default function Tickets() {
  const dispatch = useAppDispatch();

  const { tickets, loading, error, search, statusFilter, priorityFilter } =
    useAppSelector((state) => state.tickets);
useEffect(() => {
  dispatch(loadTickets());
}, [dispatch]);
  const filteredTickets = useMemo(
    () => getFilteredTickets(tickets, search, statusFilter, priorityFilter),
    [tickets, search, statusFilter, priorityFilter],
  );

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open",
  ).length;

  

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
        <Badge variant={getPriorityVariant(ticket.priority)}>
          {ticket.priority}
        </Badge>
      ),
    },

    {
      key: "status",
      header: "Status",
      render: (ticket) => (
        <Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge>
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
          <p className="text-sm font-medium text-primary">Support center</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Tickets
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View, filter and manage customer support tickets.
          </p>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="card card-hover p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total tickets</p>

                <p className="mt-1 text-2xl font-bold text-foreground">
                  {tickets.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Inbox className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="card card-hover p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open</p>

                <p className="mt-1 text-2xl font-bold text-foreground">
                  {openTickets}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info-muted text-info">
                <TicketIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="card card-hover p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Showing</p>

                <p className="mt-1 text-2xl font-bold text-foreground">
                  {filteredTickets.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        <section className="card overflow-hidden">
          <div className="px-4 py-4 md:px-5">
            <h2 className="font-semibold text-foreground">All tickets</h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage your customer support requests
            </p>
          </div>

          <TicketFilters />

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={() => dispatch(loadTickets())}
            />
          ) : (
            <Table
              data={filteredTickets}
              columns={ticketColumns}
              getRowKey={(ticket) => ticket.id}
              onRowClick={(ticket) => dispatch(setSelectedTicket(ticket.id))}
              className="min-w-225"
            />
          )}
        </section>
      </div>
    </main>
  );
}
