import StatCard from "./components/StatCard";
import AIBox from "./components/AIBox";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <AIBox />

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Revenue" value="$12,400" />
        <StatCard title="Projects" value="8" />
        <StatCard title="Tasks" value="23" />
        <StatCard title="Conversion" value="68%" />
      </div>

    </div>
  );
}