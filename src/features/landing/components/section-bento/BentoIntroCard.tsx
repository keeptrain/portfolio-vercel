import BentoCardWrapper from "./BentoCardWrapper";
import { getT } from "@/i18n/server";
import { Underline } from "@/components/icons/HandyArrows";
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
      <div className="flex h-full flex-col justify-between gap-4 sm:gap-6">
        {/* Section 1: Dynamic Animated Greetings */}
        <div>
          <RotatingGreeting />

          {/* Subtle Decorative Underline */}
          <Underline color={"dark:text-zinc-700"} />
        </div>

        {/* Section 2: About Me */}
        <div>
          <p className="leading-loose">{t("sectionHero.intro")}</p>
        </div>
      </div>
    </BentoCardWrapper>
  );
}
