import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVICES } from "../data";

export default function ServicesSection() {
  return (
    <section className="animate-in space-y-6 duration-200 fade-in-50">
      <h2 className="text-xl tracking-tight sm:text-2xl">Services</h2>

      <div className="flex flex-col gap-4">
        {SERVICES.map((service) => (
          <Card key={service.title}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
