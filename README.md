# SupportFlow — Customer Support Dashboard

A responsive customer support dashboard built as a frontend technical assignment.

## Overview

SupportFlow allows a support team to:

- View customer support tickets
- View ticket statistics
- Search tickets
- Filter tickets by status
- Filter tickets by priority
- Change ticket status
- Open tickets and view complete details
- View customer information
- View previous conversations
- Handle loading, error and empty states
- Use the dashboard across desktop and mobile devices

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Redux
- Axios
- Lucide React
- JSONPlaceholder REST API

## Features

### Dashboard

The dashboard displays:

- Total Tickets
- Open
- In Progress
- Resolved

Tickets include:

- Customer name
- Customer email
- Issue/subject
- Priority
- Status
- Created date

### Search

Tickets can be searched by:

- Customer name
- Customer email
- Ticket subject

### Filters

Tickets can be filtered by:

- Status
- Priority

### Status Management

Support agents can update a ticket's status directly from the ticket table.

Available statuses:

- Open
- In Progress
- Resolved

### Ticket Details

Clicking a ticket opens a details panel containing:

- Customer information
- Issue details
- Status
- Priority
- Created date/time
- Updated date/time
- Previous conversation

## State Management

Redux Toolkit is used for application state management.

The main Redux slice is:

`src/features/tickets/ticketsSlice.ts`

Redux manages:

- Ticket data
- Loading state
- Error state
- Search query
- Status filter
- Priority filter
- Selected ticket
- Ticket status updates

## API

The application uses JSONPlaceholder as a public REST API.

Endpoints used:

- `/posts?_limit=10`
- `/users`

The API data is transformed into customer support ticket objects on the client.

Because JSONPlaceholder is a mock API, ticket status changes are maintained in the Redux store and are not persisted to a backend.

## Project Structure

```text
src/
├── app/
│   ├── hooks.ts
│   └── store.ts
│
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── layout/
│   └── tickets/
│
├── features/
│   └── tickets/
│       └── ticketsSlice.ts
│
├── pages/
│   └── Dashboard.tsx
│
├── services/
│   └── ticketApi.ts
│
├── types/
│   └── ticket.ts
│
├── utils/
│   └── ticketUtils.ts
│
├── App.tsx
├── main.tsx
└── index.css