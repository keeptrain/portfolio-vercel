"use client";

import { useState } from "react";

export default function ProjectFilterBar() {
  const [isLatest, setIsLatest] = useState(true);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setIsLatest(!isLatest)}
        className="flex items-center gap-2"
        aria-label="Toggle latest"
      >
        <p
          className={`text-md md:text-2xl ${
            isLatest
              ? "font-medium text-black underline dark:text-lime-100"
              : "text-gray-400"
          } cursor-pointer`}
        >
          Latest
        </p>
      </button>
    </div>
  );
}
