import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Category = {
  key: string;
  title: string;
  items: string[];
};

const TOP_CATEGORIES: Category[] = [
  {
    key: "languages",
    title: "Languages",
    items: ["TypeScript", "PHP", "Kotlin"],
  },
  {
    key: "frameworks",
    title: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Laravel",
      "Livewire",
      "Jetpack Compose",
      "Android Views / XML",
      "TailwindCSS",
      "shadcn/ui",
    ],
  },
];

const ROW_TWO_CATEGORIES: Category[] = [
  {
    key: "database_baas",
    title: "Database & BaaS",
    items: ["PostgreSQL", "MySQL", "SQLite", "Redis", "Supabase", "Firebase"],
  },
  {
    key: "cloud_devops_infra",
    title: "Cloud, DevOps & Infrastructure",
    items: [
      "Vercel",
      "AWS",
      "Google Cloud",
      "Docker",
      "Podman",
      "Git",
      "GitHub",
    ],
  },
];

const API_CATEGORY: Category = {
  key: "api_architecture",
  title: "API & Architecture",
  items: ["REST APIs", "CI/CD", "Modular Monolith"],
};

export default function TechStack() {
  return (
    <div className="flex flex-col gap-4 p-1 md:gap-6">
      {/* Baris 1: Languages (Kiri) | Frameworks & Libraries (Kanan) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {TOP_CATEGORIES.map((category) => (
          <Card key={category.key} size="sm">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 transition-transform duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-gray-300 dark:hover:border-zinc-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Baris 2: Database & BaaS (Kiri) | Cloud, DevOps & Infrastructure (Kanan) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {ROW_TWO_CATEGORIES.map((category) => (
          <Card key={category.key} size="sm">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 transition-transform duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-gray-300 dark:hover:border-zinc-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Baris 3: API & Architecture */}
      <Card size="sm">
        <CardHeader>
          <CardTitle>{API_CATEGORY.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {API_CATEGORY.items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 transition-transform duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-gray-300 dark:hover:border-zinc-600"
              >
                {item}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
