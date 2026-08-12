import BentoCardWrapper from "./BentoCardWrapper";

interface BentoIntroCardProps {
  t?: (key: string) => string;
  className?: string;
}

export default function BentoIntroCard({
  className = "",
}: BentoIntroCardProps) {
  return (
    <BentoCardWrapper className={`flex flex-col justify-between ${className}`}>
      {/* Section 1: Intro */}
      <div>
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
          Thank you for taking the time to visit. Consider this a starting
          point—a space to explore who I am, what I build, and the ideas that
          shape my work. I hope it helps you decide whether we're a great fit to
          work together.
        </p>
      </div>

      {/* Subtle Divider */}
      <div className="-my-4 border-t border-gray-100 dark:border-zinc-800/80" />

      {/* Section 2: About Me */}
      <div>
        <h3 className="text-lg font-medium tracking-tight text-gray-900 sm:text-xl dark:text-white">
          About Me
        </h3>
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
          I'm Gilang — a Software Engineer with 1.5+ years of experience turning
          ideas into reliable digital products through clean code, scalable
          systems, and intuitive experiences—with a strong focus on performance,
          usability, and long-term maintainability.
        </p>
      </div>
    </BentoCardWrapper>
  );
}
