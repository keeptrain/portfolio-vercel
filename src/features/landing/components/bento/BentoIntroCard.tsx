import BentoCardWrapper from "./BentoCardWrapper";
import { getT } from "@/i18n/server";

interface BentoIntroCardProps {
  className?: string;
}

export default function BentoIntroCard({
  className = "",
}: BentoIntroCardProps) {
  const t = getT();
  return (
    <BentoCardWrapper className={`flex flex-col ${className}`}>
      {/* Section 1: Intro */}
      <div>
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
          {t("bentoHero.introText")}
        </p>
      </div>

      {/* Subtle Divider */}
      <div className="my-2 border-t border-gray-100 dark:border-zinc-800/80" />

      {/* Section 2: About Me */}
      <div>
        <h3 className="text-lg font-medium tracking-tight text-gray-900 sm:text-xl dark:text-white">
          {t("bentoHero.aboutTitle")}
        </h3>
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
          {t("bentoHero.aboutDesc")}
        </p>
      </div>
    </BentoCardWrapper>
  );
}
