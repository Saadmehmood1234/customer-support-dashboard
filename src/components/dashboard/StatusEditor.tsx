import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

import type { TicketStatus } from "../../types/ticket";
import Badge from "../common/Badge";
import { getStatusVariant } from "../../utils/ticketUtils";

interface StatusEditorProps {
  status: TicketStatus;
  onChange: (status: TicketStatus) => void;
}

const statuses: TicketStatus[] = [
  "Open",
  "In Progress",
  "Resolved",
];

export default function StatusEditor({
  status,
  onChange,
}: StatusEditorProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<TicketStatus>(status);

  const handleCancel = () => {
    setValue(status);
    setEditing(false);
  };

  const handleSave = () => {
    if (value !== status) {
      onChange(value);
    }

    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant={getStatusVariant(status)}>
          {status}
        </Badge>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setEditing(true);
          }}
          className="
            inline-flex h-7 w-7 items-center justify-center
            rounded-md
            text-muted-foreground
            transition-colors
            hover:bg-muted
            hover:text-foreground
          "
          aria-label="Edit ticket status"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5"
      onClick={(event) => event.stopPropagation()}
    >
      <select
        value={value}
        onChange={(event) =>
          setValue(event.target.value as TicketStatus)
        }
        className="input h-8 w-31.25 px-2 text-xs"
        autoFocus
      >
        {statuses.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleSave}
        className="
          inline-flex h-8 w-8 items-center justify-center
          rounded-md
          text-emerald-600
          hover:bg-emerald-50
        "
        aria-label="Save status"
      >
        <Check className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={handleCancel}
        className="
          inline-flex h-8 w-8 items-center justify-center
          rounded-md
          text-muted-foreground
          hover:bg-muted
        "
        aria-label="Cancel status edit"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}