export type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved";

export type TicketPriority =
  | "Low"
  | "Medium"
  | "High";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
}

export interface Message {
  id: number;
  sender: string;
  role: "customer" | "agent";
  message: string;
  timestamp: string;
}

export interface Ticket {
  id: number;
  customer: Customer;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface ApiPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}