import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit";

import type {
  Ticket,
  TicketStatus
} from "../../types/ticket";

import { fetchTickets } from "../../services/ticketApi";
import axios from "axios";

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;

  search: string;
  statusFilter: TicketStatus | "All";
  priorityFilter: string;

  selectedTicketId: number | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,

  search: "",
  statusFilter: "All",
  priorityFilter: "All",

  selectedTicketId: null
};

export const loadTickets = createAsyncThunk(
  "tickets/loadTickets",
  async (_, thunkAPI) => {
    try {
      return await fetchTickets();
    } catch (error) {
      console.error("Failed to load tickets:", error);

      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Response:", error.response?.data);
        console.error("URL:", error.config?.url);
      }

      return thunkAPI.rejectWithValue(
        "Unable to load tickets. Please try again."
      );
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,

  reducers: {
    updateTicketStatus: (
      state,
      action: PayloadAction<{
        id: number;
        status: TicketStatus;
      }>
    ) => {
      const ticket = state.tickets.find(
        (ticket) => ticket.id === action.payload.id
      );

      if (ticket) {
        ticket.status = action.payload.status;
        ticket.updatedAt = new Date().toISOString();
      }
    },

    setSearch: (
      state,
      action: PayloadAction<string>
    ) => {
      state.search = action.payload;
    },

    setStatusFilter: (
      state,
      action: PayloadAction<TicketStatus | "All">
    ) => {
      state.statusFilter = action.payload;
    },

    setPriorityFilter: (
      state,
      action: PayloadAction<string>
    ) => {
      state.priorityFilter = action.payload;
    },

    setSelectedTicket: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.selectedTicketId = action.payload;
    },

    clearFilters: (state) => {
      state.search = "";
      state.statusFilter = "All";
      state.priorityFilter = "All";
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        loadTickets.fulfilled,
        (state, action) => {
          state.loading = false;
          state.tickets = action.payload;
        }
      )

      .addCase(loadTickets.rejected, (state, action) => {
        state.loading = false;

        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Something went wrong.";
      });
  }
});

export const {
  updateTicketStatus,
  setSearch,
  setStatusFilter,
  setPriorityFilter,
  setSelectedTicket,
  clearFilters
} = ticketsSlice.actions;

export default ticketsSlice.reducer;