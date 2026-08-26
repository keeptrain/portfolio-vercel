"use client";

import { ComputerIcon, LucideIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const THEMES = ["system", "light", "dark"] as const;

type Theme = (typeof THEMES)[number];

const icons: Record<Theme, LucideIcon> = {
  system: ComputerIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      className="flex rounded-full bg-zinc-50 px-2 dark:bg-zinc-800"
    >
      <div className="inline-grid grid-cols-3 gap-1">
        {THEMES.map((option) => {
          const Icon = icons[option];
          return (
            <button
              key={option}
              role="radio"
              aria-checked={theme === option}
              className={`cursor-pointer rounded-full p-1.5 transition-all duration-150 ${
                theme === option
                  ? "bg-black/5 text-gray-800 dark:bg-zinc-700 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
              onClick={() => setTheme(option)}
              aria-label={`Switch to ${option} theme`}
            >
              <Icon className="size-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
