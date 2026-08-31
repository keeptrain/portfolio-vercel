"use client";

import { useState } from "react";
import { MailIcon } from "lucide-react";
import { useTranslations } from "@/i18n/TranslationContext";

interface CopyEmailButtonProps {
  email: string;
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const { t } = useTranslations();
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
      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white/20 active:scale-98 dark:bg-black/20"
    >
      <MailIcon className="size-4 text-white" />
      <div className="text-left">
        <span className="text-sm font-semibold text-white sm:text-base">
          {copied ? t("sectionSocial.copied") : t("sectionSocial.emailMe")}
        </span>
      </div>
    </button>
  );
}
