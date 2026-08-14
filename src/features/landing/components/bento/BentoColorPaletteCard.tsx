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
  return (
    <BentoCardWrapper
      className={`hidden flex-col justify-between overflow-hidden p-0 sm:flex ${className} `}
    >
      {/* Bottom Section: 4 Solid Monochrome Color Blocks Stretching Full Height */}
      <div className="grid h-24 w-full flex-1 grid-cols-4">
        {COLORS.map((color) => (
          <div
            key={color.hex}
            style={{ backgroundColor: color.bgHex }}
            className="h-full w-full border-t border-gray-100 dark:border-zinc-800"
            title={`#${color.hex}`}
          />
        ))}
      </div>

      {/* Top Section: Palette Title */}
      <div>
        <h3 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
          Monochrome
        </h3>
      </div>
    </BentoCardWrapper>
  );
}
