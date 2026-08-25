export default function TechStackSection() {
  return (
    <section className="animate-in space-y-6 duration-200 fade-in-50">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        Tech Stack
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            title: "Languages",
            items: ["TypeScript", "PHP", "Kotlin"],
          },
          {
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
          {
            title: "Database & BaaS",
            items: [
              "PostgreSQL",
              "MySQL",
              "SQLite",
              "Redis",
              "Supabase",
              "Firebase",
            ],
          },
          {
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
          {
            title: "API & Architecture",
            items: ["REST APIs", "CI/CD", "Modular Monolith"],
          },
        ].map((category) => (
          <div
            key={category.title}
            className="space-y-3 rounded-2xl border border-zinc-200/80 p-5 dark:border-zinc-800/80"
          >
            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-zinc-200/80 bg-zinc-50/80 px-3 py-1 text-xs font-medium text-zinc-700 transition-all hover:scale-105 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
