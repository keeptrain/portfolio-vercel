import BentoCardWrapper from "./BentoCardWrapper";
import { getT } from "@/i18n/server";
import { Underline } from "@/components/icons/HandyArrows";
import HandDrawnWrappingText from "@/components/shared/HandDrawnWrappingText";
import RotatingGreeting from "./RotatingGreeting";

interface BentoIntroCardProps {
  className?: string;
}

export default function BentoIntroCard({
  className = "",
}: BentoIntroCardProps) {
  const t = getT();
  return (
    <BentoCardWrapper className={className}>
      <div className="flex h-full flex-col justify-between gap-4 sm:gap-2">
        {/* Section 1: Dynamic Animated Greetings */}
        <RotatingGreeting />

        {/* Subtle Decorative Underline */}
        <Underline color={"dark:text-zinc-700"} />

        {/* Section 2: About Me */}
        <div>
          <HandDrawnWrappingText>About me</HandDrawnWrappingText>
          <p className="leading-relaxed">{t("bentoHero.aboutDesc")}</p>
        </div>
      </div>
    </BentoCardWrapper>
  );
}
