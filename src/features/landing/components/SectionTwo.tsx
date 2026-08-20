"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/i18n/TranslationContext";
import TechStack from "./section-two/TechStack";
import HowIWork from "./section-two/HowIWork";

export default function SectionTwo() {
  const [activeTab, setActiveTab] = useState<string>("howIWork");

  return (
    <section id="section-2" className="my-6 lg:py-12">
      <Container>
        <NavigationButton activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="overflow-hidden pt-6 md:pt-8">
          <div key={activeTab} className="animate-fade-in min-h-80 md:min-h-90">
            {activeTab === "howIWork" ? <HowIWork /> : <TechStack />}
          </div>
        </div>
      </Container>
    </section>
  );
}

function NavigationButton({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const { t } = useTranslations();

  return (
    <div className="flex items-end gap-4">
      {[
        { id: "howIWork", label: t("sectionTwo.tab1") },
        { id: "techStack", label: t("sectionTwo.tab2") },
      ].map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-pressed={isActive}
            className={cn(
              "cursor-pointer bg-transparent transition-colors duration-300",
              isActive
                ? "text-xl font-medium text-black sm:text-xl md:text-2xl dark:text-white"
                : "text-lg font-light text-gray-400 sm:text-xl md:text-2xl dark:text-gray-500",
            )}
          >
            {tab.label} {tab.id === "techStack" ? "" : "/"}
          </button>
        );
      })}
    </div>
  );
}
