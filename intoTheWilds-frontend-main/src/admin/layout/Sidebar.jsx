import { NavLink } from "react-router-dom";
import {
  Home,
  CalendarCheck,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
} from "lucide-react";

const items = [
  { to: "/admin", icon: <Home size={20} />, end: true, label: "Dashboard" },
  {
    to: "/admin/realty",
    icon: <Building2 size={20} />,
    label: "Properties",
  },
  {
    to: "/admin/reservation",
    icon: <CalendarCheck size={20} />,
    label: "Bookings",
  },
  {
    to: "/admin/settings",
    icon: <Settings size={20} />,
    label: "Settings",
  },
];

export default function Sidebar({ collapsed, toggle, onExit }) {
  return (
    <aside
      className={`bg-slate-900 h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-14" : "w-60"
      }`}
    >
      {/* collapse btn */}
      <button
        onClick={toggle}
        aria-label="Toggle Sidebar"
        className="w-full flex justify-center p-3 hover:bg-slate-800 text-white text-sm md:text-base"
      >
        {collapsed ? <ChevronRight size={20}/> : <ChevronLeft size={20} />}
      </button>

      <nav className="flex flex-col gap-2 px-2">
        {items.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm md:text-base
              transition-colors
              ${
                isActive
                  ? "bg-slate-800 text-cyan-400"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {icon}
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={onExit}
        className="mx-2 mt-auto mb-4 flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-pink-600/20 text-pink-200 hover:bg-pink-600/30 text-sm md:text-base"
      >
        <LogOut size={20} />
        {!collapsed && <span>Exit</span>}
      </button>
    </aside>
  );
}
