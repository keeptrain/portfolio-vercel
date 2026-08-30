import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TECH_STACK } from "../data";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

export default function TechStackSection() {
  const isLanguagesCard = (title: string) => title === "Languages";
  return (
    <section className="animate-in space-y-6 duration-200 fade-in-50">
      <h2 className="text-xl tracking-tight sm:text-2xl">Tech Stack</h2>
      <p className="flex items-center gap-2">
        I put a my knowledge maybe notes too on some card you can click the title or
        <ArrowUpRightIcon className="size-3" />
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {TECH_STACK.map((category) => (
          <Card key={category.title} className="">
            <CardHeader>
              <CardTitle>
                {!isLanguagesCard(category.title) && (
                  <span>{category.title}</span>
                )}
                {category.title === "Languages" && (
                  <Link
                    href="/about/techstack/languages"
                    className="group flex justify-between"
                  >
                    <span className="group-hover:underline">
                      {category.title}
                    </span>
                    <div className="flex size-7 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                      <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all hover:scale-105"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
