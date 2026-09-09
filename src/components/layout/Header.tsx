import {
  Bell,
  HelpCircle,
  Search
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            placeholder="Quick search..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <button
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="ml-2 flex items-center gap-3 border-l border-slate-200 pl-4">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Support agent"
            className="h-8 w-8 rounded-full"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Alex Morgan
            </p>

            <p className="text-xs text-slate-500">
              Support Agent
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}