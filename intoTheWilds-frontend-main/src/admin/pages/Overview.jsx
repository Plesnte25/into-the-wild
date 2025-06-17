import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { IndianRupee } from "lucide-react";

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

export default function Overview() {
  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
      <section className="grid gap-6 xl:grid-cols-4">
        {/* KPI Tiles */}
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-slate-900 rounded-xl p-4 flex flex-col gap-1 shadow-inner"
          >
            <span className="text-lg uppercase tracking-wide text-slate-400">
              {kpi.label}
            </span>
            <div className="">
              <span className="text-2xl font-semibold pr-4">{kpi.value}</span>
              <span className="text-emerald-400 text-md">{kpi.delta}</span>
            </div>
          </div>
        ))}
      </section>
      {/* Charts */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="col-span-2 bg-slate-900 p-4 rounded-xl shadow-inner">
          <div className="py-2">
            <h1 className="text-lg mb-2 font-medium text-slate-300">
              Total Revenue
            </h1>
            <div className="flex items-center justify-betwen py-1">
              <IndianRupee size={25} className="inline mr-1" />
              <span className="text-2xl font-semibold pr-4">1347</span>
              <span className="text-emerald-400 text-md">+10%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip cursor={{ fill: "#1e293b" }} />
              <Line
                name="Revenue"
                type="monotone"
                dataKey="revenue"
                stroke="#06b6d4"
                strokeWidth={1.5}
              />
              <Line
                name="Expenses"
                type="monotone"
                dataKey="expenses"
                stroke="#c084fc"
                strokeWidth={1.5}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl shadow-inner flex flex-col gap-2">
          <h3 className="text-sm font-medium text-slate-300">Total Profit</h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={revenueData.slice(0, 6)}>
              <Bar dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <XAxis dataKey="quarter" stroke="#64748b" />
            </BarChart>
          </ResponsiveContainer>
          <h3 className="text-sm font-medium text-slate-300 mt-4">
            Total Visitors
          </h3>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={revenueData.slice(0, 6)}>
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#c084fc"
                strokeWidth={2}
              />
              <XAxis dataKey="month" stroke="#64748b" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
