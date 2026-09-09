import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Customers from "./pages/Customers";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import TicketDetailsModal from "./components/tickets/TicketDetailsModal";

import { UserRound,BellIcon } from "lucide-react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex h-full flex-col lg:pl-64">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/tickets" element={<Tickets />} />

            <Route path="/customers" element={<Customers />} />

            <Route path="/settings" element={<ComingSoon />} />

            <Route
              path="/profile"
              element={
                <ComingSoon
                  title="Profile"
                  description="We're working on your profile experience. This section will be available soon."
                  icon={UserRound}
                />
              }
            />
            <Route
              path="/notification"
              element={
                <ComingSoon
                  title="Notification"
                  description="We're working on your notification experience. This section will be available soon."
                  icon={BellIcon}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <TicketDetailsModal />
    </div>
  );
}
