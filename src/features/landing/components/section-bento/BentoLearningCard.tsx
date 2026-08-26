import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getT } from "@/i18n/server";

interface BentoLearningCardProps {
  className?: string;
}

export default function BentoLearningCard({
  className = "",
}: BentoLearningCardProps) {
  const t = getT();

  return (
    <Card className={`${className} flex flex-col justify-between`}>
      <CardHeader>
        <CardTitle>{t("sectionHero.currentFocus.header")}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Title & Description */}
        <h3 className="text-lg font-medium tracking-tight sm:text-xl">
          {t("sectionHero.currentFocus.title")}
        </h3>
        <p className="text-xs leading-relaxed sm:text-sm">
          {t("sectionHero.currentFocus.desc")}
        </p>
      </CardContent>
    </Card>
  );
}
