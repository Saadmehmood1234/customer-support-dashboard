import {
  BarChart3,
  Inbox,
  LifeBuoy,
  Settings,
  Users
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    icon: BarChart3,
    active: true
  },
  {
    label: "Tickets",
    icon: Inbox
  },
  {
    label: "Customers",
    icon: Users
  }
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <LifeBuoy className="h-4 w-4 text-white" />
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            SupportFlow
          </span>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />

              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}