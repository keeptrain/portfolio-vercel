import Link from "next/link";
import { MailIcon } from "lucide-react";
import { ArrowUpRight } from "@/components/icons/HandyArrows";

interface EmailCardProps {
  className?: string;
  url?: string;
}

export default function EmailCard({
  className = "",
  url = "mailto:yourname@email.com",
}: EmailCardProps) {
  return (
    <Link
      href={url}
      className={`group relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-sky-800 p-4 transition-all duration-300 hover:bg-sky-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${className}`}
    >
      <div className="flex flex-col items-center gap-1 text-white">
        <p className="text-base font-medium tracking-tight sm:text-lg">
          email me
        </p>
        <MailIcon className="size-4 sm:size-5" />
      </div>
      <div className="absolute bottom-2.5 right-3 hidden lg:block">
        <ArrowUpRight color="text-white" />
      </div>
    </Link>
  );
}
