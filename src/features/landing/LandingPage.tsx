import BentoHeroSection from "./components/bento/BentoHeroSection";
import SectionTwo from "./components/SectionTwo";
import { setRequestLocale } from "@/i18n/server";
import { Locale } from "@/i18n/locales";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <BentoHeroSection />
      <SectionTwo />
    </>
  );
}
