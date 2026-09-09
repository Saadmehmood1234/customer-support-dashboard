import axios from "axios";

import type { Customer, Message, Ticket } from "../types/ticket";

interface ApiTicket {
  id: string | number;
  customerId: string | number;
  subject: string;
  description: string;
  priority: Ticket["priority"];
  status: Ticket["status"];
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export async function fetchTickets(): Promise<Ticket[]> {
  const [ticketsResponse, customersResponse] = await Promise.all([
    api.get<ApiTicket[]>("/Tickets"),
    api.get<Customer[]>("/Customers"),
  ]);

  const tickets = ticketsResponse.data;
  const customers = customersResponse.data;
  return tickets.map((ticket): Ticket => {
    const customer = customers.find(
      (customer) => String(customer.id) === String(ticket.customerId),
    );

    if (!customer) {
      throw new Error(
        `Customer ${ticket.customerId} not found for ticket ${ticket.id}`,
      );
    }

    return {
      id: Number(ticket.id),
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      customer,
      messages: ticket.messages ?? [],
    };
  });
}
