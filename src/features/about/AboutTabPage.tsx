import { notFound } from "next/navigation";
import { Section, Sections } from "./types";
import { ABOUT_SECTIONS } from "./constants";
import { Button } from "@/components/ui/button";

interface AboutTabPageProps {
  params: Promise<{
    tab: string;
  }>;
}

export default async function AboutTabPage({ params }: AboutTabPageProps) {
  const { tab } = await params;
  const currentTab = tab as Section;

  if (!Sections.includes(currentTab)) {
    notFound();
  }

  const ActiveComponent = ABOUT_SECTIONS[currentTab]?.component;

  if (!ActiveComponent) {
    notFound();
  }

  return (
    <>
      <ActiveComponent />
    </>
  );
}
