import {
  ArrowLeft,
  X
} from "lucide-react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  setSelectedTicket
} from "../../features/tickets/ticketsSlice";

import TicketDetails from "./TicketDetails";

export default function TicketDetailsModal() {
  const dispatch = useAppDispatch();

  const {
    tickets,
    selectedTicketId
  } = useAppSelector(
    (state) => state.tickets
  );

  if (selectedTicketId === null) {
    return null;
  }

  const ticket = tickets.find(
    (item) => item.id === selectedTicketId
  );

  if (!ticket) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[1px]">
      <div className="flex h-full w-full max-w-2xl flex-col bg-slate-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <button
            onClick={() =>
              dispatch(setSelectedTicket(null))
            }
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tickets
          </button>

          <button
            onClick={() =>
              dispatch(setSelectedTicket(null))
            }
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close ticket"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <TicketDetails ticket={ticket} />
        </div>
      </div>
    </div>
  );
}