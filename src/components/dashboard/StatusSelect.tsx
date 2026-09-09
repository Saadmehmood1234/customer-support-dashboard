import type { TicketStatus } from "../../types/ticket";

interface StatusSelectProps {
  status: TicketStatus;
  onChange: (status: TicketStatus) => void;
}

export default function StatusSelect({
  status,
  onChange
}: StatusSelectProps) {
  return (
    <select
      value={status}
      onChange={(event) =>
        onChange(event.target.value as TicketStatus)
      }
      onClick={(event) => event.stopPropagation()}
      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="Open">Open</option>
      <option value="In Progress">
        In Progress
      </option>
      <option value="Resolved">Resolved</option>
    </select>
  );
}