import React from "react";

export default function OpenToWorkBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-300/70 bg-white px-4 py-2 text-gray-900 transition-all duration-300 dark:border-white/10 dark:bg-zinc-900 dark:text-white/80">
      {/* dot */}
      <span className="relative inline-flex h-3.5 w-3.5">
        {/* glow */}
        <span className="absolute inset-0 animate-pulse rounded-full bg-emerald-800/40 blur-[3px]" />
        {/* core */}
        <span className="relative inline-block h-3.5 w-3.5 animate-pulse rounded-full bg-emerald-400 ring-2 ring-white dark:ring-gray-900" />
      </span>
      <span className="md:font-medium-ex text-xs font-medium md:text-sm">
        Open to Work
      </span>
    </div>
  );
}
