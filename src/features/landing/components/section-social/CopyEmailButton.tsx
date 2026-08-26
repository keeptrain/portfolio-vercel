"use client";

import { useState } from "react";
import { MailIcon } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCopy();
      }}
      className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white/20 active:scale-98 dark:bg-black/20"
    >
      <div className="text-left">
        <span className="text-sm font-semibold text-white sm:text-base">
          {copied ? "Copied!" : "Email me"}
        </span>
      </div>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md transition-all duration-200 group-hover:bg-white group-hover:text-zinc-900">
        <MailIcon className="size-4" />
      </div>
    </button>
  );
}
