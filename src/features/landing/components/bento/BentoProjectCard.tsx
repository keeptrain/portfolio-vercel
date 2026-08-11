import Image from "next/image";
import Link from "next/link";
import BentoCardWrapper from "./BentoCardWrapper";
import { Locale } from "@/i18n/locales";
import { ArrowUpRight } from "@/components/icons/HandyArrows";

interface BentoProjectCardProps {
  t: (key: string) => string;
  locale: Locale;
  className?: string;
}

export default function BentoProjectCard({
  t,
  locale,
  className = "",
}: BentoProjectCardProps) {
  return (
    <BentoCardWrapper
      style={{
        enableHover: true,
        tagCard: {
          enabled: true,
          label: t("bentoHero.featuredProjectBadge"),
          action: (
            <Link
              href={`/${locale}/projects/jakreq`}
              className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowUpRight color={"text-blue-old"} />
            </Link>
          ),
        },
      }}
      className={`flex flex-col justify-between ${className}`}
    >
      {/* Project Image Showcase */}
      <div className="flex flex-col gap-3">
        <div className="relative aspect-5/2 w-full overflow-hidden rounded-xl border border-gray-200/80 bg-gray-100 dark:border-zinc-700/80 dark:bg-zinc-800">
          <Image
            src="/test-png.jpg"
            alt="JakReq Showcase"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </BentoCardWrapper>
  );
}
