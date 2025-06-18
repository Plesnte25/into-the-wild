import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

export default function PropertyDashboard() {
  const [summary, setSummary] = useState([
    { label: "Total Bookings", value: 8, growth: 28.4 },
    { label: "Canceled", value: 3, growth: 12.1 },
    { label: "Total Rooms", value: 15, growth: 15.3 },
    { label: "Total Visitors", value: 364, growth: 24.6 },
  ]);

  const [occupancy, setOccupancy] = useState({
    percentage: 50,
    stats: [
      { icon: "👥", count: 48 },
      { icon: "🛏️", count: 15 },
      { icon: "🚪", count: 15 },
      { label: "Total Rooms", count: 15 },
      { label: "Occupied", count: 8 },
      { label: "Guest", count: 12, color: "text-white" },
      { label: "In Hotel", count: 9, color: "text-cyan-400" },
      { label: "Out Hotel", count: 3, color: "text-white" },
    ],
  });

  const [furniture, setFurniture] = useState([
    { item: "Ceiling Fan", count: 50 },
    { item: "Center Table", count: 12 },
    { item: "Chairs", count: 123 },
    { item: "Refrigerator", count: 6 },
    { item: "Kettle", count: 12 },
  ]);

  const [bookings, setBookings] = useState(
    Array.from({ length: 10 }).map((_, i) => ({
      orderId: `ORDER-${1000 + i}`,
      customer: "NAME",
      package: "PACKAGE",
      bookingStatus: "Live",
      roomType: "AC/NON AC",
      mobile: "1234567890",
      arrival: "01/01/01",
      departure: "01/01/01",
      paymentStatus: "PAID",
    }))
  );

  return (
    <div className="text-[#E2E8F0] font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">🏢 Property 1 Overview</h1>
        <button className="bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded-md text-sm font-semibold shadow">
          📤 Export Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {summary.map(({ label, value, growth }, index) => (
          <div
            key={index}
            className="border border-[#2D3748] bg-[#121C33] p-5 rounded-lg shadow-sm hover:shadow-md"
          >
            <h2 className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              {label}
            </h2>
            <p className="text-2xl font-bold text-white">{value}</p>
            <span className="text-green-400 text-xs">+{growth}%</span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="bg-[#121C33] p-6 rounded-xl grid md:grid-cols-3 gap-8 border border-[#2D3748] mb-10">
        {/* Occupancy */}
        <div className="text-center">
          <h2 className="text-[2rem] font-medium mb-4 text-white">Occupancy</h2>
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
              {occupancy.percentage}%
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-[#2D3748]"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400"
                strokeDasharray={`${occupancy.percentage}, 100`}
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-3 gap-3">
            {occupancy.stats?.slice(0, 3).map(({ icon, count }, i) => (
              <div key={i} className="bg-[#1A2439] p-3 rounded-md text-center">
                <div className="text-sm text-gray-300">{icon}</div>
                <div className="text-lg font-bold text-white">{count}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {occupancy.stats?.slice(3, 5).map(({ label, count }, i) => (
              <div key={i} className="bg-[#1A2439] p-3 rounded-md text-center">
                {label}<br />
                <span className="font-bold text-white">{count}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {occupancy.stats?.slice(5).map(({ label, count, color }, i) => (
              <div key={i} className="bg-[#1A2439] p-3 rounded-md text-center">
                {label}<br />
                <span className={`font-bold ${color}`}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Furniture */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[1.5rem] font-semibold text-white">🪑 Furniture</h2>
            <button className="p-1 rounded hover:bg-[#2D3748] transition">
              <Pencil className="w-4 h-4 text-blue-400" />
            </button>
          </div>
          <div className="space-y-3 border border-[#2D3748] rounded-lg p-3">
            {furniture.map(({ item, count }, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#1A2439] px-4 py-2 rounded-lg hover:bg-[#26314B] transition"
              >
                <span className="text-sm font-medium text-white">{item}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{count.toString().padStart(2, "0")}</span>
                  <span className="text-gray-400">➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-semibold mb-4 bg-[#1A2439] inline-block px-3 py-1 rounded-md shadow-sm">Recent Booking</h2>
        <div className="overflow-x-auto rounded-lg shadow-inner border border-[#2D3748]">
          <table className="min-w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-800 text-slate-400">
              <tr>
                {["ORDER ID", "CUSTOMER", "PACKAGE", "BOOKING", "ROOM TYPE", "MOBILE", "ARRIVAL", "DEPARTURE", "PAYMENT", "EDIT"].map((head, idx) => (
                  <th key={idx} className="px-4 py-2 whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bookings.map((booking, i) => (
                <tr key={i} className="hover:bg-slate-800/50">
                  <td className="px-4 py-2 whitespace-nowrap">{booking.orderId}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{booking.customer}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{booking.package}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="bg-green-500 text-xs text-white px-2 py-1 rounded">{booking.bookingStatus}</span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{booking.roomType}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{booking.mobile}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{booking.arrival}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{booking.departure}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="bg-green-600 text-xs text-white px-2 py-1 rounded">{booking.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-blue-400 cursor-pointer">/EDIT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}