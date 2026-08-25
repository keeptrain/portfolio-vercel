import Image from "next/image";
import BentoCardWrapper from "./BentoCardWrapper";

interface BentoProfileCardProps {
  className?: string;
}

export default function BentoProfileCard({
  className = "",
}: BentoProfileCardProps) {
  return (
    <BentoCardWrapper
      className={`relative flex items-center justify-center overflow-hidden p-6 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Avatar Profile Image */}
        <div className="relative size-32 overflow-hidden rounded-full border-2 border-white/90 from-gray-100 to-gray-200 shadow-md sm:size-36 dark:border-zinc-700/90 dark:from-zinc-800 dark:to-zinc-900">
          <Image
            src="/images/photo.jpg"
            alt="Profile Photo"
            fill
            sizes="(max-width: 640px) 128px, 144px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Mobile-Only Text Social Links Below Photo */}
      {/* <div className="mt-6 flex items-center gap-12 sm:hidden">
        {SOCIAL_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <span>{link.name}</span>
            <ArrowUpRight className="size-3" />
          </Link>
        ))}
      </div> */}
    </BentoCardWrapper>
  );
}
