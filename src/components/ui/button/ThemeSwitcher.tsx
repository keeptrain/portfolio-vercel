import React from "react";
import {Theme, useTheme} from "@/contexts/ThemeContext";

const ThemeSwitcher = () => {
  const options: Theme[] = ['system', 'light', 'dark']
  const {theme, toggleTheme} = useTheme()

  const icons = {
    system: (
      <svg className="w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"/>
      </svg>
    ),
    light: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    dark: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M20.354 15.354A9 9 0 018.646 3.646A9.003,9.003,0,0012,21a9.003,9.003,0,008.354-5.646Z"/>
      </svg>
    )
  }

  return (
    <div role="radiogroup" aria-label="Theme switcher"
         className="flex rounded-full p-1.5 bg-white dark:bg-zinc-800">
      <div className="inline-grid grid-cols-3 gap-1">
        {options.map((option) => {
          return (
            <button
              key={option}
              role="radio"
              aria-checked={theme === option}
              className={`rounded-full p-1.5 text-gray-500 dark:text-zinc-50 hover:text-gray-800 transition-all duration-150 cursor-pointer  
                ${theme === option ? 'bg-black/5 dark:bg-zinc-700 border-gray-200 text-gray-800 ' : 'bg-transparent border-transparent'}`}
              aria-label={`Switch to ${option} theme`}
              onClick={() => {
                toggleTheme(option)
              }}
            >
              {icons[option]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ThemeSwitcher;