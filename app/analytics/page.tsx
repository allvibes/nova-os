'use client'

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 9000 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold tracking-tight">
        Analytics Overview
      </h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-3 gap-6">

        <div className="nova-card p-6">
          <p className="text-sm text-gray-400">Total Revenue</p>
          <h2 className="text-2xl font-semibold mt-2">$34,000</h2>
        </div>

        <div className="nova-card p-6">
          <p className="text-sm text-gray-400">Active Projects</p>
          <h2 className="text-2xl font-semibold mt-2">12</h2>
        </div>

        <div className="nova-card p-6">
          <p className="text-sm text-gray-400">Conversion Rate</p>
          <h2 className="text-2xl font-semibold mt-2">72%</h2>
        </div>

      </div>

      {/* CHART */}
      <div className="nova-card p-6 h-[300px]">

        <p className="text-sm text-gray-400 mb-4">
          Revenue Growth
        </p>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}