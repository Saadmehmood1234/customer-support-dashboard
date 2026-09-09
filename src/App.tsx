import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import TicketDetailsModal from "./components/tickets/TicketDetailsModal";

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <Dashboard />
      </div>

      <TicketDetailsModal />
    </div>
  );
}