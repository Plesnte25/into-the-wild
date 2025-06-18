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
import axios from "axios";
import{React,useState,useEffect} from "react";
import { BASE_URL } from "@/utils/baseurl";

// Static data - need to change with actual data

export default function Overview() {
  const [kpis, setKpis] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASE_URL}/dashboard/overview`, {
          headers: {
            authorization:`Bearer ${localStorage.getItem("token")}`,
          },
        });
      setKpis(res.data.kpis);
      setRevenueData(res.data.revenueData);
    };
    fetchData();
  }, []);
  console.log("kpis",kpis);

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
