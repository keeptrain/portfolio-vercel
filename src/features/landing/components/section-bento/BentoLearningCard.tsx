import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getT } from "@/i18n/server";

interface BentoLearningCardProps {
  className?: string;
}

export default function BentoLearningCard({
  className = "",
}: BentoLearningCardProps) {
  const t = getT();

  return (
    <div className={`pt-1 pr-1 pb-1 ${className}`}>
      <Card className="flex h-full flex-col justify-between">
        <CardHeader>
          <CardTitle>{t("sectionHero.currentFocus.header")}</CardTitle>
          <CardDescription>
            {t("sectionHero.currentFocus.title")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{t("sectionHero.currentFocus.desc")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
