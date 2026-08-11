"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "@/components/icons/HandyArrows";

interface SocialItem {
  id: "linkedin" | "github";
  url: string;
  bgColor: string;
  hoverColor: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "linkedin",
    url: "https://linkedin.com",
    bgColor: "bg-[#89D3F3]",
    hoverColor: "hover:bg-[#78C8EE]",
  },
  {
    id: "github",
    url: "https://github.com",
    bgColor: "bg-zinc-900",
    hoverColor: "hover:bg-zinc-800",
  },
];

export default function BentoSocialCard({
  className = "",
}: {
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto Slider Effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SOCIAL_ITEMS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentItem = SOCIAL_ITEMS[currentIndex];

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 30) {
      if (diffX > 0) {
        // Swipe Left -> Next
        setCurrentIndex((prev) => (prev + 1) % SOCIAL_ITEMS.length);
      } else {
        // Swipe Right -> Prev
        setCurrentIndex(
          (prev) => (prev - 1 + SOCIAL_ITEMS.length) % SOCIAL_ITEMS.length,
        );
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-3xl p-0 shadow-sm transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {SOCIAL_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex h-full w-full shrink-0 flex-col items-center justify-center p-6 ${item.bgColor} ${item.hoverColor} text-white transition-colors duration-300`}
          >
            {/* Center Brand Logo / Text */}
            <div className="my-auto flex items-center justify-center">
              {item.id === "linkedin" ? (
                <span className="text-6xl font-bold tracking-tighter sm:text-7xl">
                  in
                </span>
              ) : (
                <svg className="size-16 sm:size-20 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              )}
            </div>

            {/* Bottom Right Floating Arrow Circle Button */}
            <div className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full  text-white transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight color="text-white" />
            </div>
          </a>
        ))}
      </div>

      {/* Bottom Left Slide Dots Indicator */}
      <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
        {SOCIAL_ITEMS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-5 bg-white opacity-100"
                : "w-2 bg-white/50 opacity-60 hover:opacity-100"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
