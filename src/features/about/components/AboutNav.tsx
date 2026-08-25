import { cn } from "@/lib/utils";
import { Section } from "../types";
import { ABOUT_SECTIONS } from "../constants";

interface AboutNavProps {
  activeTab: Section;
  selectTab: (id: Section) => void;
  onItemClick?: () => void;
  className?: string;
  iconSizeClassName?: string;
  textSizeClassName?: string;
}

export function AboutNav({
  activeTab,
  selectTab,
  onItemClick,
  className,
  iconSizeClassName = "size-5",
  textSizeClassName = "font-medium",
}: AboutNavProps) {
  return (
    <nav
      className={cn(
        "flex flex-col space-y-4 border-l border-zinc-200 pl-0 dark:border-zinc-800",
        className,
      )}
    >
      {Section.map((tab) => {
        const isActive = activeTab === tab;
        const item = ABOUT_SECTIONS[tab];
        const Icon = item.icon;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => {
              selectTab(tab);
              onItemClick?.();
            }}
            className={cn(
              "-ml-px flex items-center gap-3 border-l-2 pl-4 text-left transition-all duration-300",
              isActive
                ? "border-zinc-500 text-zinc-900 dark:border-emerald-400 dark:text-zinc-100"
                : "border-transparent text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
            )}
          >
            <Icon className={cn("shrink-0", iconSizeClassName)} />
            <span className={textSizeClassName}>{item.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
