import {
  BarChart3,
  Inbox,
  LifeBuoy,
  Settings,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Overview",
    icon: BarChart3,
    path: "/",
  },
  {
    label: "Tickets",
    icon: Inbox,
    path: "/tickets",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/customers",
  },
];

interface SidebarProps {
  mobileMenuOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  mobileMenuOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          border-r border-sidebar-border
          bg-sidebar
          transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <LifeBuoy className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>

            <span className="text-lg font-bold tracking-tight text-foreground">
              SupportFlow
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-sidebar-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-sidebar-border p-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}