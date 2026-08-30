import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { OnThisPageRightTabProps } from "../OnThisPageRightTab";

export default function ListLanguagesMobileMenus({
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
    <div className="mt-2 ml-6 border-l border-zinc-200 dark:border-zinc-800 ">
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
  );
}
