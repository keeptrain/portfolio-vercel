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
      className={`${className} flex h-fit flex-col justify-between`}
    >
      {/* Title & Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium tracking-tight sm:text-xl">
          {t("bentoHero.learningTitle")}
        </h3>
        <p className="text-xs leading-relaxed sm:text-sm">
          {t("bentoHero.learningDesc")}
        </p>
      </div>
    </BentoCardWrapper>
  );
}
