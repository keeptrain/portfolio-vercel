import React, {useState} from "react";

export default function OpenToWorkBadge() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="px-4 py-2 inline-flex items-center gap-2
        rounded-full border border-gray-300/70 dark:border-white/10
        bg-white/50 dark:bg-white/5 text-gray-900 dark:text-gray-100
        transition-all duration-300"
    >
      {/* dot */}
      <span className="relative inline-flex h-3.5 w-3.5">
        {/* glow */}
        <span className="absolute inset-0 rounded-full bg-emerald-800/40 blur-[3px] animate-pulse"/>
        {/* core */}
        <span
          className="relative inline-block h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-gray-900 animate-pulse"/>
      </span>
      <span className="text-xs md:text-sm font-light md:font-bold tracking-widest">
        {isHovered ? "Hire me" : "Open to work"}
      </span>
    </div>
  );
}