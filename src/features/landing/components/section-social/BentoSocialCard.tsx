import Link from "next/link";

interface SocialItem {
  id: "email" | "linkedin" | "github";
  url: string;
  bgColor: string;
  hoverColor: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "email",
    url: "https://linkedin.com",
    bgColor: "bg-gray-200",
    hoverColor: "hover:bg-[#78C8EE]",
  },
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

export default function BentoSocialCard() {
  return (
    <div className="grid w-1/2 grid-cols-2 gap-4 sm:gap-2 md:grid-cols-3">
      {/*social cards*/}
      {SOCIAL_ITEMS.map((item) => (
        <Link
          href={item.url}
          key={item.id}
          target="_blank"
          className={`flex h-full w-full shrink-0 items-center justify-center sm:col-span-1 ${item.bgColor} ${item.hoverColor} rounded-xl text-white transition-colors duration-300`}
        >
          {item.id === "email" ? (
            <span className="text-3xl font-light tracking-tighter sm:text-4xl">
              email
            </span>
          ) : item.id === "linkedin" ? (
            <span className="text-3xl font-bold tracking-tighter sm:text-4xl">
              in
            </span>
          ) : (
            <svg className="size-8 fill-current sm:size-10" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          )}
        </Link>
      ))}
    </div>
  );
}
