import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";
import {
  Menu,
  ChevronRight,
  ChevronLeft,
  NotebookPen,
  Home,
  CalendarCheck,
  Building2,
  Users2,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

// Static data - need to change with actual data
const kpis = [
  { label: "Total Bookings", value: 1340, delta: "+28.4%" },
  { label: "Cancelled", value: 340, delta: "+3.2%" },
  { label: "Total Properties", value: 56, delta: "+28.4%" },
  { label: "Total Visitors", value: 2364, delta: "+28.4%" },
  { label: "Online Bookings", value: 1200, delta: "+28.4%" },
  { label: "Offline Booking", value: 140, delta: "+28.4%" },
  { label: "Total Location", value: 56, delta: "+28.4%" },
  { label: "Partners", value: 25, delta: "+28.4%" },
];

const revenueData = [
  { month: "Jan", revenue: 25, expenses: 10 },
  { month: "Feb", revenue: 35, expenses: 17 },
  { month: "Mar", revenue: 50, expenses: 20 },
  { month: "Apr", revenue: 65, expenses: 25 },
  { month: "May", revenue: 80, expenses: 33 },
  { month: "Jun", revenue: 95, expenses: 45 },
  { month: "Jul", revenue: 105, expenses: 52 },
  { month: "Aug", revenue: 120, expenses: 60 },
  { month: "Sep", revenue: 135, expenses: 70 },
  { month: "Oct", revenue: 150, expenses: 79 },
  { month: "Nov", revenue: 170, expenses: 88 },
  { month: "Dec", revenue: 200, expenses: 95 },
];

/* ------------------------------------------------------------------ */
function SidebarItem({ to, label, icon }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition-colors ${
        active ? "bg-slate-800 text-cyan-400" : "text-slate-300"
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

/* ------------------------------------------------------------------ */
export default function AdminPanel() {
  const [open, setOpen] = useState(false); // sidebar state on mobile
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="flex items-center justify-between gap-4 px-4 lg:px-8 h-14 border-b border-slate-800">
        <button
          className="lg:hidden p-1 rounded-md hover:bg-slate-800 border-none text-red-50"
          onClick={() => setOpen(true)}
        >
          <Menu size={30} />
        </button>
        <h1 className="text-xl font-bold tracking-wide">OVERVIEW</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-sm px-6 py-1 rounded-md">
          <NotebookPen /> Export Data
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 shadow-lg z-50 transform transition-transform lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
            <span className="font-semibold">Menu</span>
            <button
              className="p-1 rounded-md hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-full pb-24 lg:pb-4">
            <SidebarItem
              to="/admin"
              label="Dashboard"
              icon={<Home size={18} />}
            />
            <SidebarItem
              to="/admin/bookings"
              label="Bookings"
              icon={<CalendarCheck size={18} />}
            />
            <SidebarItem
              to="/admin/properties"
              label="Properties"
              icon={<Building2 size={18} />}
            />
            <SidebarItem
              to="/admin/visitors"
              label="Visitors"
              icon={<Users2 size={18} />}
            />
            <SidebarItem
              to="/admin/settings"
              label="Settings"
              icon={<Settings size={18} />}
            />
            <button
              onClick={() => navigate("/login")}
              className="mt-8 flex items-center gap-3 px-4 py-2 rounded-md bg-pink-600/10 text-pink-200 hover:bg-pink-600/20"
            >
              <LogOut size={18} /> Exit
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {open && (
          <div
            className="fixed inset-0 bg-black/60 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <Outlet /> {/* Sub‑pages render here */}
          {/* ---- Overview default ---- */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* KPI Tiles */}
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-slate-900 rounded-xl p-4 flex flex-col gap-1 shadow-inner"
              >
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  {kpi.label}
                </span>
                <span className="text-2xl font-semibold">{kpi.value}</span>
                <span className="text-emerald-400 text-xs">{kpi.delta}</span>
              </div>
            ))}
          </section>
          {/* Charts */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="col-span-2 bg-slate-900 p-4 rounded-xl shadow-inner">
              <h3 className="text-sm mb-2 font-medium text-slate-300">
                Total Revenue
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip cursor={{ fill: "#1e293b" }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#06b6d4"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#c084fc"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl shadow-inner flex flex-col gap-2">
              <h3 className="text-sm font-medium text-slate-300">
                Total Profit
              </h3>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={revenueData.slice(0, 6)}>
                  <Bar dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <h3 className="text-sm font-medium text-slate-300 mt-4">
                Total Sessions
              </h3>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={revenueData.slice(0, 6)}>
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#c084fc"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
// Placeholder sub‑pages so your <Outlet/> has something to render
// Create files like routes/admin/Bookings.jsx etc. and export a component.
// Example:
// export function Bookings() { return <div>Bookings…</div>; }
