import { useEffect } from "react";

import {
  CheckCircle2,
  CircleDot,
  Clock3,
  Inbox
} from "lucide-react";

import {
  useAppDispatch,
  useAppSelector
} from "../app/hooks";

import { loadTickets } from "../features/tickets/ticketsSlice";


import StatsCard from "../components/dashboard/StatsCard";
import TicketFilters from "../components/dashboard/TicketFilters";
import TicketTable from "../components/dashboard/TicketTable";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import { getStatusCount } from "../utils/ticketUtils";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const {
    tickets,
    loading,
    error
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

  return (
    <main className="min-w-0 flex-1 bg-slate-50">
      <div className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            Support center
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Customer Support
          </h1>

          <p className="mt-1 text-sm text-slate-500">
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
            iconClassName="bg-blue-50 text-blue-600"
          />

          <StatsCard
            label="Open"
            value={openCount}
            icon={
              <CircleDot className="h-5 w-5" />
            }
            iconClassName="bg-sky-50 text-sky-600"
          />

          <StatsCard
            label="In Progress"
            value={inProgressCount}
            icon={
              <Clock3 className="h-5 w-5" />
            }
            iconClassName="bg-violet-50 text-violet-600"
          />

          <StatsCard
            label="Resolved"
            value={resolvedCount}
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            iconClassName="bg-emerald-50 text-emerald-600"
          />
        </div>

        <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
          <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Support tickets
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                View and manage customer issues.
              </p>
            </div>

            <p className="text-xs font-medium text-slate-500">
              {tickets.length} total tickets
            </p>
          </div>

          <TicketFilters />

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
            <TicketTable />
          )}
        </section>
      </div>
    </main>
  );
}