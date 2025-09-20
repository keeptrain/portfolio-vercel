import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  gradient?: boolean;
  gradientColor?: string;
}

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  className = "",
  gradient = true,
  gradientColor = "white",
}: MarqueeProps) {
  const animationDirection =
    direction === "left" ? "scroll-left" : "scroll-right";
  const animationDuration = `${speed}s`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient overlays */}
      {gradient && (
        <>
          <div
            className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full"
            style={{
              background: `linear-gradient(to right, ${gradientColor}, transparent)`,
            }}
          />
          <div
            className="pointer-events-none absolute top-0 right-0 z-10 h-full w-full"
            style={{
              background: `linear-gradient(to left, ${gradientColor}, transparent)`,
            }}
          />
        </>
      )}

      {/* Marquee content */}
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `${animationDirection} ${animationDuration} linear infinite`,
        }}
      >
        <div className="flex items-center">{children}</div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
