'use client'

import { Home, Folder, Users, Brain ,CheckSquare, BarChart3 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Folder, label: "Projects", path: "/projects" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Brain, label: "AI Assistant", path: "/ai" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface/80 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col">

      {/* LOGO */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight nova-gradient-text">
          NOVA OS
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          AI Command Center
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-2">

        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <div
              key={i}
              onClick={() => router.push(item.path)}
              className={clsx(
                "group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200",

                // base
                "text-gray-300",

                // hover
                "hover:bg-white/5 hover:scale-[1.02]",

                // active state
                isActive && "bg-white/10 text-white shadow-glow"
              )}
            >
              {/* ICON */}
              <Icon
                size={18}
                className={clsx(
                  "transition",
                  isActive && "text-indigo-400"
                )}
              />

              {/* LABEL */}
              <span className="text-sm font-medium tracking-tight">
                {item.label}
              </span>

              {/* ACTIVE INDICATOR */}
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-indigo-400 shadow-glow" />
              )}
            </div>
          );
        })}

      </nav>

      {/* BOTTOM SECTION (OPTIONAL FUTURE) */}
      <div className="mt-auto pt-6">
        <div className="nova-card p-4 text-xs text-gray-400">
          <p>System Status</p>
          <p className="text-green-400 mt-1">All systems active</p>
        </div>
      </div>

    </aside>
  );
}