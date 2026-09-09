import axios from "axios";
import type {
  ApiPost,
  ApiUser,
  Ticket,
  TicketPriority,
  TicketStatus,
  Message
} from "../types/ticket";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000
});

const priorities: TicketPriority[] = [
  "Low",
  "Medium",
  "High"
];

const statuses: TicketStatus[] = [
  "Open",
  "In Progress",
  "Resolved"
];

const subjects = [
  "Unable to access my account",
  "Payment was charged twice",
  "Unable to reset password",
  "Dashboard is not loading",
  "Need help with subscription",
  "Invoice information is incorrect",
  "Unable to update profile",
  "Export report is failing",
  "Email notifications not working",
  "Account verification issue"
];

const descriptions = [
  "The customer is facing an issue and needs assistance from the support team.",
  "The customer reported an unexpected behavior while using the application.",
  "The customer needs help resolving an issue with their account.",
  "The customer contacted support regarding a problem with the platform."
];

function createMessages(
  post: ApiPost,
  customer: ApiUser
): Message[] {
  return [
    {
      id: post.id * 10 + 1,
      sender: customer.name,
      role: "customer",
      message: post.body,
      timestamp: new Date(
        Date.now() - post.id * 3600000
      ).toISOString()
    },
    {
      id: post.id * 10 + 2,
      sender: "Support Agent",
      role: "agent",
      message:
        "Thanks for reaching out. Our support team is looking into this and will get back to you shortly.",
      timestamp: new Date(
        Date.now() - post.id * 1800000
      ).toISOString()
    }
  ];
}

export async function fetchTickets(): Promise<Ticket[]> {
  const [postsResponse, usersResponse] = await Promise.all([
    api.get<ApiPost[]>("/posts?_limit=10"),
    api.get<ApiUser[]>("/users")
  ]);

  const posts = postsResponse.data;
  const users = usersResponse.data;

  return posts.map((post, index) => {
    const user =
      users.find((item) => item.id === post.userId) ??
      users[index % users.length];

    const status = statuses[index % statuses.length];

    const priority = priorities[index % priorities.length];

    const customer = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company.name,
      avatar: `https://i.pravatar.cc/100?img=${user.id}`
    };

    return {
      id: post.id,
      customer,
      subject:
        subjects[index % subjects.length],
      description:
        descriptions[index % descriptions.length],
      priority,
      status,
      createdAt: new Date(
        Date.now() - index * 86400000
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - index * 43200000
      ).toISOString(),
      messages: createMessages(post, user)
    };
  });
}