import { Building2, Mail, Phone, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadTickets } from "../features/tickets/ticketsSlice";

import Badge from "../components/common/Badge";
import type { TableColumn } from "../components/dashboard/Table.tsx";
import Table from "../components/dashboard/Table.tsx";

export default function Customers() {
  const dispatch = useAppDispatch();

  const { tickets, loading, error } = useAppSelector(
    (state) => state.tickets,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

  const customers = Array.from(
    new Map(
      tickets.map((ticket) => [ticket.customer.id, ticket.customer]),
    ).values(),
  );

  const filteredCustomers = customers.filter((customer) => {
    const query = search.toLowerCase().trim();

    return (
      !query ||
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.company.toLowerCase().includes(query)
    );
  });

  const getCustomerTickets = (customerId: number) => {
    return tickets.filter(
      (ticket) => ticket.customer.id === customerId,
    );
  };

  const activeCustomers = customers.filter((customer) =>
    getCustomerTickets(customer.id).some(
      (ticket) => ticket.status !== "Resolved",
    ),
  ).length;

  const customerColumns: TableColumn<(typeof customers)[number]>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (customer) => (
        <div className="flex items-center gap-3">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-background"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {customer.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {customer.email}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "company",
      header: "Company",
      render: (customer) => (
        <div className="flex items-center gap-2 text-sm text-secondary-foreground">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          {customer.company}
        </div>
      ),
    },

    {
      key: "contact",
      header: "Contact",
      render: (customer) => (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            {customer.email}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            {customer.phone}
          </div>
        </div>
      ),
    },

    {
      key: "tickets",
      header: "Tickets",
      render: (customer) => {
        const customerTickets = getCustomerTickets(customer.id);

        return (
          <Badge variant="neutral">
            {customerTickets.length}
          </Badge>
        );
      },
    },

    {
      key: "open",
      header: "Open",
      render: (customer) => {
        const openTickets = getCustomerTickets(customer.id).filter(
          (ticket) => ticket.status !== "Resolved",
        ).length;

        return (
          <Badge variant={openTickets > 0 ? "info" : "success"}>
            {openTickets}
          </Badge>
        );
      },
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
            Customers
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View customers and their support activity.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total customers
                </p>

                <p className="mt-1 text-2xl font-bold text-foreground">
                  {customers.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active customers
                </p>

                <p className="mt-1 text-2xl font-bold text-foreground">
                  {activeCustomers}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info-muted text-info">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total tickets
                </p>

                <p className="mt-1 text-2xl font-bold text-foreground">
                  {tickets.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-4 md:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-foreground">
                  All customers
                </h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {filteredCustomers.length} customers
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customers..."
                  className="h-10 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/10"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center px-6 py-16">
              <p className="text-sm text-muted-foreground">
                Loading customers...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <h3 className="font-semibold text-foreground">
                Unable to load customers
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {error}
              </p>

              <button
                type="button"
                onClick={() => dispatch(loadTickets())}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Try again
              </button>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                No customers found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try another search.
              </p>
            </div>
          ) : (
            <Table
              data={filteredCustomers}
              columns={customerColumns}
              getRowKey={(customer) => customer.id}
              className="min-w-225"
            />
          )}
        </section>
      </div>
    </main>
  );
}