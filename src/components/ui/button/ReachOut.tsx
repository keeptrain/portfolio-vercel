import { PaperAirplane } from "@/components/icons/HeroIcons";
import Link from "next/link";

const ReachOutButton = () => {
  return (
    <Link
      href={"/contact"}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-1 text-sm text-black"
    >
      <PaperAirplane color={""} />
      Reach out
    </Link>
  );
};
