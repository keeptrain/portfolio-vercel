"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { TocItem } from "../data";

export interface OnThisPageRightTabProps {
  items: TocItem[];
  className?: string;
}

export default function OnThisPageRightTab({
  items,
  className,
}: OnThisPageRightTabProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className={cn(
        "w-full shrink-0 lg:w-56",
        // mobile: sticky di bawah Menu (Menu sticky top-0 + pt-4)
        "sticky top-14 z-20 -mx-4 bg-white/80 px-4 py-2 backdrop-blur-md lg:top-24 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0",
        "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950/80 lg:dark:bg-transparent",
        className,
      )}
    >
      <div className="lg:sticky lg:top-24">
        <div className="hidden items-center gap-2 pb-3 text-sm font-medium lg:flex">
          <Menu className="size-4" />
          <span>On this page</span>
        </div>

        <div className="border-l border-zinc-200 max-lg:hidden dark:border-zinc-800">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = activeId === item.id;
              const level = item.level ?? 1;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setActiveId(item.id);
                    }}
                    className={cn(
                      "-ml-px block border-l-2 py-1 text-sm transition-colors",
                      level === 1 && "pl-4",
                      level === 2 && "pl-8",
                      level === 3 && "pl-12",
                      isActive
                        ? "border-yellow-400 font-semibold text-yellow-500 dark:text-yellow-400"
                        : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
