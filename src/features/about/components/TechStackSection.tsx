import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TECH_STACK } from "../data";

export default function TechStackSection() {
  return (
    <section className="animate-in space-y-6 duration-200 fade-in-50">
      <h2 className="text-xl tracking-tight sm:text-2xl">Tech Stack</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {TECH_STACK.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
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
