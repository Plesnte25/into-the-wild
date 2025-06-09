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
  GaugeCircle,
  Users2,
  Building2,
  // MousePointerSquare,
  PieChart as PieIcon,
  LogOut,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

const kpi = [
  { title: "Gross Profit", value: "₹ 1,234.00", delta: "+28.4%" },
  { title: "Net Profit", value: "₹ 1,234.00", delta: "+28.4%" },
  { title: "Expenses", value: "₹ 1,234.00", delta: "+28.4%" },
  { title: "Miscellaneous", value: "₹ 1,234.00", delta: "+28.4%" },
];

const tinyBar = [
  { name: "12 AM", uv: 20 },
  { name: "8 AM", uv: 35 },
  { name: "4 PM", uv: 45 },
  { name: "11 PM", uv: 32 },
];

const revenueSeries = [
  { month: "Jan", rev: 50, exp: 25 },
  { month: "Feb", rev: 70, exp: 30 },
  { month: "Mar", rev: 90, exp: 35 },
  { month: "Apr", rev: 110, exp: 45 },
  { month: "May", rev: 95, exp: 40 },
  { month: "Jun", rev: 125, exp: 50 },
  { month: "Jul", rev: 140, exp: 55 },
  { month: "Aug", rev: 100, exp: 45 },
  { month: "Sep", rev: 120, exp: 48 },
  { month: "Oct", rev: 150, exp: 60 },
  { month: "Nov", rev: 170, exp: 70 },
  { month: "Dec", rev: 200, exp: 80 },
];

function Overview() {
  return (
    <div className="space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpi.map((c) => (
          <div
            key={c.title}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-inner text-slate-100"
          >
            <h3 className="uppercase text-xs tracking-wider text-slate-400 mb-1">
              {c.title}
            </h3>
            <p className="text-2xl font-semibold">{c.value}</p>
            <span className="text-emerald-400 text-xs font-medium">
              {c.delta}
            </span>
          </div>
        ))}
      </div>

      {/* REVENUE LINE CHART + side widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-slate-800 rounded-xl p-4 shadow-inner">
          <h3 className="text-slate-200 mb-4 text-sm font-medium">
            Total revenue
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueSeries} margin={{ right: 10 }}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip wrapperClassName="!text-xs" />
              <Line
                type="monotone"
                dataKey="rev"
                stroke="#38bdf8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="exp"
                stroke="#a78bfa"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-4 text-slate-200 shadow-inner">
            <h4 className="text-xs uppercase tracking-wide mb-2">
              Total profit
            </h4>
            <p className="text-xl font-semibold mb-4">₹ 144.6K</p>
            <ResponsiveContainer width="100%" height={90}>
              <BarChart data={tinyBar}>
                <Bar dataKey="uv" fill="#c084fc" radius={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-slate-200 shadow-inner">
            <h4 className="text-xs uppercase tracking-wide mb-2">
              Total sessions
            </h4>
            <p className="text-xl font-semibold">400</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const AdminPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (!user || user.role !== "admin")
      navigate("/login", { replace: true, state: { from: location.pathname } });
  }, [user, navigate, location]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Layout
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 hidden lg:block bg-slate-950 border-r border-slate-800">
        <div className="p-6 text-xl font-bold tracking-wide">In TWS</div>
        <nav className="px-4 text-sm space-y-1">
          <SideLink
            to="overview"
            icon={<LineChartIcon size={16} />}
            label="Overview"
          />
          <SideLink
            to="bookings"
            icon={<GaugeCircle size={16} />}
            label="Bookings"
          />
          <SideLink
            to="properties"
            icon={<Building2 size={16} />}
            label="Properties"
          />
          <SideLink
            to="visitors"
            icon={<Users2 size={16} />}
            label="Visitors"
          />
          <SideLink
            to="analytics"
            icon={<PieIcon size={16} />}
            label="Analytics"
          />
          <button
            onClick={() => navigate("/logout")}
            className="flex items-center w-full gap-2 px-3 py-2 mt-4 rounded-md hover:bg-slate-800/60"
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

// Helpers
function SideLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-800/60 ${
          isActive ? "bg-slate-800 text-cyan-400" : ""
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

export default AdminPanel;
