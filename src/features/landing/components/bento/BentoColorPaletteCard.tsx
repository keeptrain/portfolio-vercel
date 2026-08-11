"use client";

import BentoCardWrapper from "./BentoCardWrapper";

interface PaletteColor {
  hex: string;
  bgHex: string;
}

const COLORS: PaletteColor[] = [
  { hex: "000000", bgHex: "#000000" },
  { hex: "27272A", bgHex: "#27272A" },
  { hex: "71717A", bgHex: "#71717A" },
  { hex: "F4F4F5", bgHex: "#F4F4F5" },
];

export default function BentoColorPaletteCard({
  className = "",
}: {
  className?: string;
}) {
  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(`#${hex}`);
  };

  return (
    <BentoCardWrapper
      className={`hidden flex-col justify-between sm:flex ${className}`}
    >
      {/* Bottom Section: 4 Solid Monochrome Color Blocks Stretching Full Height */}
      <div className="grid h-full w-full flex-1 grid-cols-4 overflow-hidden">
        {COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => handleCopy(color.hex)}
            style={{ backgroundColor: color.bgHex }}
            className="h-full w-full border-t border-gray-100 transition-all hover:brightness-105 active:scale-95 dark:border-zinc-800"
            title={`Copy #${color.hex}`}
          />
        ))}
      </div>

      {/* Top Section: Palette Title */}
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Monochrome
      </h3>
    </BentoCardWrapper>
  );
}
