import StatCard from "./components/StatCard";
import dynamic from "next/dynamic";

// ✅ Lazy load AIBox here (TOP LEVEL)
const AIBox = dynamic(() => import("./components/AIBox"), {
  loading: () => (
    <div className="p-4 text-sm text-gray-500">
      Loading AI...
    </div>
  ),
});

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* AI (lazy loaded) */}
      <AIBox />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Revenue" value="$12,400" />
        <StatCard title="Projects" value="8" />
        <StatCard title="Tasks" value="23" />
        <StatCard title="Conversion" value="68%" />
      </div>

    </div>
  );
}