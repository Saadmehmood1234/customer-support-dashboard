import {
  Search,
  SlidersHorizontal,
  X
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  clearFilters,
  setPriorityFilter,
  setSearch,
  setStatusFilter
} from "../../features/tickets/ticketsSlice";

export default function TicketFilters() {
  const dispatch = useAppDispatch();

  const {
    search,
    statusFilter,
    priorityFilter
  } = useAppSelector(
    (state) => state.tickets
  );

  const hasFilters =
    search ||
    statusFilter !== "All" ||
    priorityFilter !== "All";

  return (
    <div className="border-b border-slate-200 p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              dispatch(setSearch(event.target.value))
            }
            placeholder="Search by customer, subject or email..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />

            <select
              value={statusFilter}
              onChange={(event) =>
                dispatch(
                  setStatusFilter(
                    event.target.value as
                      | "All"
                      | "Open"
                      | "In Progress"
                      | "Resolved"
                  )
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All statuses
              </option>
              <option value="Open">Open</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Resolved">
                Resolved
              </option>
            </select>
          </div>

          <select
            value={priorityFilter}
            onChange={(event) =>
              dispatch(
                setPriorityFilter(event.target.value)
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">
              All priorities
            </option>
            <option value="High">High</option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">Low</option>
          </select>

          {hasFilters && (
            <button
              onClick={() =>
                dispatch(clearFilters())
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}