import Image from "next/image";
import BentoCardWrapper from "./BentoCardWrapper";

interface BentoProfileCardProps {
  t?: (key: string) => string;
  className?: string;
}

export default function BentoProfileCard({
  className = "",
}: BentoProfileCardProps) {
  return (
    <BentoCardWrapper
      className={`relative flex flex-col items-center justify-center overflow-hidden p-6 ${className}`}
    >
      {/* Container for Avatar + Circular Text Ring */}
      <div className="relative my-auto flex items-center justify-center p-4">
        {/* Rotating Circular Text SVG Ring */}
        <svg
          className="pointer-events-none absolute -inset-4 size-[calc(100%+2rem)] animate-[spin_20s_linear_infinite] text-gray-600 dark:text-gray-300"
          viewBox="0 0 200 200"
        >
          <defs>
            <path
              id="avatarCirclePath"
              d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
            />
          </defs>
          <text className="fill-current text-[10px] font-bold tracking-[0.22em] uppercase">
            <textPath href="#avatarCirclePath" startOffset="0%">
              AVAILABLE FOR WORK ✦ AVAILABLE FOR WORK ✦{" "}
            </textPath>
          </text>
        </svg>

        {/* Avatar Profile Image */}
        <div className="relative size-32 overflow-hidden rounded-full border-2 border-white/90 from-gray-100 to-gray-200 shadow-md sm:size-36 dark:border-zinc-700/90 dark:from-zinc-800 dark:to-zinc-900">
          <Image
            src="/images/photos.png"
            alt="Profile Photo"
            fill
            sizes="(max-width: 640px) 128px, 144px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </BentoCardWrapper>
  );
}
