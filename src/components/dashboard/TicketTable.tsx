import { useMemo } from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  setSelectedTicket,
  updateTicketStatus
} from "../../features/tickets/ticketsSlice";



import EmptyState from "../common/EmptyState";
import TicketRow from "./TicketRow";
import { getFilteredTickets } from "../../utils/ticketUtils";

export default function TicketTable() {
  const dispatch = useAppDispatch();

  const {
    tickets,
    search,
    statusFilter,
    priorityFilter
  } = useAppSelector(
    (state) => state.tickets
  );

  const filteredTickets = useMemo(
    () =>
      getFilteredTickets(
        tickets,
        search,
        statusFilter,
        priorityFilter
      ),
    [
      tickets,
      search,
      statusFilter,
      priorityFilter
    ]
  );

  if (!filteredTickets.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customer
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Issue
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Priority
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Created
              </th>

              <th className="px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                onOpen={() =>
                  dispatch(
                    setSelectedTicket(ticket.id)
                  )
                }
                onStatusChange={(status) =>
                  dispatch(
                    updateTicketStatus({
                      id: ticket.id,
                      status
                    })
                  )
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}