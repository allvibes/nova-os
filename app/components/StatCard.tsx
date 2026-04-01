'use client'

import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
  change?: string; // e.g. "+12%"
  positive?: boolean;
};

export default function StatCard({ title, value, change, positive }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        nova-card
        p-6
        rounded-2xl
        overflow-hidden
        nova-card-hover
      "
    >
      {/* 🔥 ANIMATED BORDER GLOW */}
      <div className="
        absolute inset-0 rounded-2xl pointer-events-none
        border border-transparent
        before:absolute before:inset-0 before:rounded-2xl
        before:border before:border-indigo-500/20
        before:animate-pulse
      " />

      {/* ✨ CONTENT */}
      <div className="relative z-10">

        {/* TITLE */}
        <p className="text-sm nova-text-muted tracking-tight">
          {title}
        </p>

        {/* VALUE */}
        <h2 className="text-3xl font-semibold mt-2 tracking-tight">
          {value}
        </h2>

        {/* 📈 CHANGE INDICATOR */}
        {change && (
          <p
            className={`text-xs mt-2 font-medium ${
              positive ? "text-green-400" : "text-red-400"
            }`}
          >
            {change} from last week
          </p>
        )}

      </div>

      {/* 🌈 SUBTLE GLOW BACKGROUND */}
      <div className="
        absolute -top-10 -right-10 w-32 h-32
        bg-indigo-500/10 blur-3xl
        opacity-60
      " />

    </motion.div>
  );
}