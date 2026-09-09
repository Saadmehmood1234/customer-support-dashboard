import { Bell, HelpCircle, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <NavLink
          to="/notification"
          className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:tex"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </NavLink>
        <NavLink
          to="/profile"
          className="ml-2 flex items-center gap-3 rounded-lg border-l border-border py-1.5 pl-4 pr-2 transition hover:bg-muted"
        >
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Alex Morgan"
            className="h-8 w-8 rounded-full object-cover"
          />

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-foreground">Alex Morgan</p>

            <p className="text-xs text-muted-foreground">Support Agent</p>
          </div>
        </NavLink>
      </div>
    </header>
  );
}
