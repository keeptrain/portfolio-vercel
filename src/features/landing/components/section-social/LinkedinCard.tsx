import Link from "next/link";
import { ArrowUpRight } from "@/components/icons/HandyArrows";

interface LinkedinCardProps {
  className?: string;
  url?: string;
}

export default function LinkedinCard({
  className = "",
  url = "https://linkedin.com",
}: LinkedinCardProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-[#89D3F3] p-4 transition-all duration-300 hover:opacity-95 ${className}`}
    >
      <span className="font-sans text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
        in
      </span>
      <div className="absolute right-3 bottom-2.5 hidden lg:block">
        <ArrowUpRight color="text-white" />
      </div>
    </Link>
  );
}
