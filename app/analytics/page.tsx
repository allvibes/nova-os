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
    <div className="p-6 space-y-6 animate-fadeIn">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Analytics Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track performance, revenue, and growth insights
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="nova-card nova-card-hover p-6">
          <p className="text-sm text-gray-400">Total Revenue</p>
          <h2 className="text-2xl font-semibold mt-2">$34,000</h2>
        </div>

        <div className="nova-card nova-card-hover p-6">
          <p className="text-sm text-gray-400">Active Projects</p>
          <h2 className="text-2xl font-semibold mt-2">12</h2>
        </div>

        <div className="nova-card nova-card-hover p-6">
          <p className="text-sm text-gray-400">Conversion Rate</p>
          <h2 className="text-2xl font-semibold mt-2">72%</h2>
        </div>

      </div>

      {/* CHART */}
      <div className="nova-card nova-card-hover p-6">

        <p className="text-sm text-gray-400 mb-4">
          Revenue Growth
        </p>

        {/* 🔥 CRITICAL FIX: dedicated height wrapper */}
        <div className="w-full h-[320px] min-h-[280px]">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#9ca3af" }}
                itemStyle={{ color: "#e5e7eb" }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
}