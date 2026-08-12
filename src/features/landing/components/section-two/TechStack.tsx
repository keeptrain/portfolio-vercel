import {
  Atom,
  Boxes,
  Braces,
  Code2,
  CodeXml,
  Component,
  Container,
  Database,
  DatabaseZap,
  GitBranch,
  Palette,
  Server,
  SquareTerminal,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/i18n/TranslationContext";

type Tech = { name: string; icon: LucideIcon };

const CATEGORIES: { key: string; icon: LucideIcon; items: Tech[] }[] = [
  {
    key: "frontend",
    icon: Component,
    items: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Component },
      { name: "TypeScript", icon: Braces },
      { name: "TailwindCSS", icon: Palette },
    ],
  },
  {
    key: "backend",
    icon: Server,
    items: [
      { name: "Node.js", icon: Code2 },
      { name: "Laravel", icon: CodeXml },
      { name: "REST APIs", icon: Server },
    ],
  },
  {
    key: "database",
    icon: Database,
    items: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Boxes },
      { name: "MySQL", icon: DatabaseZap },
    ],
  },
  {
    key: "tools",
    icon: Triangle,
    items: [
      { name: "Git", icon: GitBranch },
      { name: "Docker", icon: Container },
      { name: "Vercel", icon: Triangle },
      { name: "VS Code", icon: SquareTerminal },
    ],
  },
];

export default function TechStack() {
  const { t } = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
      {CATEGORIES.map((category) => (
        <div
          key={category.key}
          className="rounded-2xl border border-gray-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-md md:p-5 dark:border-zinc-800/80 dark:bg-zinc-900/50"
        >
          <div className="mb-3 flex items-center gap-2">
            <category.icon className="size-4 text-gray-500 dark:text-gray-400" />
            <h4 className="text-sm font-semibold text-black dark:text-white">
              {t(`sectionTwo.techStack.${category.key}`)}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.items.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-transform duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-sm dark:border-zinc-700 dark:text-gray-300 dark:hover:border-zinc-600"
              >
                <tech.icon className="size-3.5 text-gray-400 dark:text-gray-500" />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
