import BentoCardWrapper from "./BentoCardWrapper";
import { getT } from "@/i18n/server";

interface BentoLearningCardProps {
  className?: string;
}

export default function BentoLearningCard({
  className = "",
}: BentoLearningCardProps) {
  const t = getT();

  return (
    <BentoCardWrapper
      style={{
        enableHover: false,
        tagCard: {
          enabled: true,
          label: "Current Focus",
        },
      }}
      className={`flex flex-col justify-between ${className}`}
    >
      {/* Title & Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium tracking-tight text-gray-900 sm:text-xl dark:text-white">
          {t("bentoHero.learningTitle")}
        </h3>
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
          {t("bentoHero.learningDesc")}
        </p>
      </div>
    </BentoCardWrapper>
  );
}
