'use client'

import { useState } from "react";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(0);

  // simulate notification (for demo)
  const triggerNotification = () => {
    setNotifications((prev) => prev + 1);
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    console.log("Searching for:", query);

    // later: route or filter data
    // router.push(`/search?q=${query}`)
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-background/60 backdrop-blur-xl">

      {/* 🔍 SEARCH BAR */}
      <div className="flex items-center gap-2">

        <div className="relative">

          {/* ICON */}
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          {/* INPUT */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything..."
            className="
              nova-input
              pl-9 pr-4 py-2.5
              w-80
              text-sm
            "
          />
        </div>

        {/* GO BUTTON */}
        <button
          onClick={handleSearch}
          className="
            nova-btn-primary
            px-4 py-2
            rounded-xl
            text-sm font-medium
          "
        >
          Go
        </button>

      </div>

      {/* 🔔 RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <div
          className="relative cursor-pointer"
          onClick={triggerNotification} // demo interaction
        >
          <Bell className="text-gray-300" />

          {/* BADGE */}
          <div
            className={`
              absolute -top-2 -right-2
              min-w-[18px] h-[18px]
              px-1
              flex items-center justify-center
              text-[10px] font-bold
              rounded-full
              transition-all
              ${
                notifications > 0
                  ? "bg-red-500 text-white scale-100"
                  : "bg-white/10 text-gray-400 scale-90"
              }
            `}
          >
            {notifications}
          </div>
        </div>

        {/* PROFILE */}
        <div className="
          w-9 h-9
          rounded-full
          bg-gradient-to-br from-indigo-500 to-purple-500
          flex items-center justify-center
          text-xs font-bold
          cursor-pointer
          hover:scale-105 transition
        ">
          SE
        </div>

      </div>
    </div>
  );
}