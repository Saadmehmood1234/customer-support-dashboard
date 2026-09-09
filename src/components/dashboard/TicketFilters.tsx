import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  clearFilters,
  setPriorityFilter,
  setSearch,
  setStatusFilter,
} from "../../features/tickets/ticketsSlice";
import FilterSelect from "./FilterSelect";
import SearchFilters from "./SearchFilters";

export default function TicketFilters() {
  const dispatch = useAppDispatch();

  const { search, statusFilter, priorityFilter } = useAppSelector(
    (state) => state.tickets,
  );

  const hasFilters =
    Boolean(search) ||
    statusFilter !== "All" ||
    priorityFilter !== "All";

  return (
    <SearchFilters
      search={search}
      onSearchChange={(value) => dispatch(setSearch(value))}
      searchPlaceholder="Search by customer, subject or email..."
      hasFilters={hasFilters}
      onClearFilters={() => dispatch(clearFilters())}
      filters={
        <>
          <FilterSelect
            value={statusFilter}
            onChange={(value) =>
              dispatch(
                setStatusFilter(
                  value as
                    | "All"
                    | "Open"
                    | "In Progress"
                    | "Resolved",
                ),
              )
            }
            options={[
              { value: "All", label: "All statuses" },
              { value: "Open", label: "Open" },
              { value: "In Progress", label: "In Progress" },
              { value: "Resolved", label: "Resolved" },
            ]}
          />

          <FilterSelect
            value={priorityFilter}
            onChange={(value) => dispatch(setPriorityFilter(value))}
            options={[
              { value: "All", label: "All priorities" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
          />
        </>
      }
    />
  );
}