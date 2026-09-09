# Ticketra — Customer Support Dashboard

A responsive customer support dashboard built with React, TypeScript, and Tailwind CSS as part of a frontend developer technical assignment.

Ticketra allows support teams to view, search, filter, update, and inspect customer support tickets through a clean and responsive interface.

## Overview

The application provides:

* Ticket statistics
* Ticket listing
* Ticket search
* Status filtering
* Priority filtering
* Ticket status management
* Ticket details
* Customer information
* Previous ticket conversations
* Loading, error, and empty states
* Responsive desktop and mobile layouts

## Features

### Dashboard

The dashboard displays ticket statistics for:

* Total Tickets
* Open
* In Progress
* Resolved

Tickets display:

* Customer name
* Issue / subject
* Priority
* Status
* Created date

### Ticket Search

Tickets can be searched by:

* Customer name
* Customer email
* Ticket subject

### Ticket Filters

Tickets can be filtered by:

* Status

  * All
  * Open
  * In Progress
  * Resolved
* Priority

  * All
  * Low
  * Medium
  * High

Filters can also be cleared to return to the complete ticket list.

### Status Management

Support agents can update the status of a ticket directly from the ticket interface.

Available statuses:

* Open
* In Progress
* Resolved

### Ticket Details

Clicking a ticket opens a ticket details panel.

The details view contains:

* Customer information
* Customer email and phone
* Customer company
* Ticket subject
* Issue description
* Current status
* Current priority
* Created date/time
* Updated date/time
* Previous conversation/messages

### Customers

The Customers section provides an overview of customers associated with the support tickets.

It includes:

* Customer name
* Email
* Company
* Contact information
* Ticket count
* Customer search
* Active customer statistics

### Responsive UI

The application is designed to work across desktop and mobile screen sizes.

The layout adapts using Tailwind CSS responsive utilities, with mobile-first layouts and larger-screen adjustments.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Redux Toolkit
* React Redux
* Axios
* React Router
* Lucide React
* MockAPI.io

## State Management

Redux Toolkit is used for application state management.

The main Redux slice is:

`src/features/tickets/ticketsSlice.ts`

Redux manages:

* Ticket data
* Loading state
* Error state
* Search query
* Status filter
* Priority filter
* Selected ticket
* Ticket status updates


## API

The application uses MockAPI.io as the mock REST API.

The API provides customer and ticket data that is consumed by the frontend through Axios.

The application uses the API to load ticket data and associated customer information.

Ticket data is transformed and managed in the frontend according to the application's ticket types.


## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone <your-github-repository-url>

cd <project-directory>

npm install
```

### Environment Variables

If the project uses an environment variable for the API URL, create a `.env` file in the project root:

```env
VITE_API_BASE_URL=<your-api-base-url>
```

Use the variable name configured in `src/services/ticketApi.ts`.

If the API URL is currently defined directly in the service file, no environment variable is required.

### Run the Development Server

```bash
npm run dev
```

The application will be available at the local URL shown by Vite.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## AI Usage

AI tools were used during development as permitted by the assignment.

### Tools used

* ChatGPT
* AI-assisted code review and debugging

AI assistance was used for:

* Component implementation suggestions
* React and TypeScript debugging
* Redux implementation guidance
* Tailwind CSS refactoring
* Responsive UI improvements
* Code organization and reusable component design
* README and documentation refinement

## Submission

### GitHub Repository

https://github.com/Saadmehmood1234/customer-support-dashboard

### Live Demo

https://customer-support-dashboard-theta.vercel.app/

