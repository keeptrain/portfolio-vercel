import Image from "next/image";
import BentoCardWrapper from "./BentoCardWrapper";
import { getT } from "@/i18n/server";

interface BentoProjectCardProps {
  className?: string;
}

export default function BentoProjectCard({
  className = "",
}: BentoProjectCardProps) {
  const t = getT();

  return (
    <BentoCardWrapper
      style={{
        enableHover: true,
        tagCard: {
          enabled: true,
          label: t("bentoHero.featuredProjectBadge"),
        },
      }}
      className={` ${className}`}
    >
      {/* Project Image Showcase */}
      <div className="relative aspect-4/3 w-full">
        <Image
          src="/test-png.jpg"
          alt="latest project"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-xl"
        />
      </div>
    </BentoCardWrapper>
  );
}
