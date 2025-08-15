export default function OpenToWorkBadge() {
  return (
    <span
      className="
        inline-flex items-center gap-2
        rounded-full border border-gray-300/70 dark:border-white/10
        bg-white/70 dark:bg-white/5
        px-4 py-2
        text-sm font-medium text-gray-900 dark:text-gray-100
        shadow-sm
        backdrop-blur-[2px]
      "
    >


      Open to work
      {/* dot */}
      <span className="relative inline-flex h-3.5 w-3.5">
            {/* glow */}
        <span className="absolute inset-0 rounded-full bg-emerald-600/40 blur-[3px] animate-pulse"/>
        {/* core */}
        <span
          className="relative inline-block h-3.5 w-3.5 rounded-full bg-emerald-300 ring-2 ring-white dark:ring-gray-900 animate-pulse"/>
      </span>
    </span>
  );
}