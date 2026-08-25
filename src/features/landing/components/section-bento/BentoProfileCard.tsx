import Image from "next/image";

interface BentoProfileCardProps {
  className?: string;
}

export default function BentoProfileCard({
  className = "",
}: BentoProfileCardProps) {
  return (
    <div className={`flex h-full items-center justify-center ${className}`}>
      {/* Circular Avatar Profile Photo */}
      <div className="relative size-36 overflow-hidden rounded-full border-2 border-white/90 shadow-md sm:size-44 dark:border-zinc-700/90">
        <Image
          src="/images/photo.jpg"
          alt="Profile Photo"
          fill
          sizes="(max-width: 640px) 144px, 176px"
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
