"use client";

import { useState } from "react";

export default function FilterLatestButton() {
  const [isLatest, setIsLatest] = useState(false);
  return (
    <button onClick={() => setIsLatest(!isLatest)}>
      <p
        className={`text-md md:text-2xl ${isLatest ? "text-black underline dark:text-white" : "text-zinc-400"} cursor-pointer`}
      >
        Latest
      </p>
    </button>
  );
}
