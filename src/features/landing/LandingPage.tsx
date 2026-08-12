import { Locale } from "@/i18n/locales";
import { getTranslations } from "@/i18n/getTranslations";
import BentoHeroSection from "./components/bento/BentoHeroSection";
import SectionTwo from "./components/SectionTwo";
import SectionSocial from "./components/SectionSocial";

interface LandingPageProps {
  locale: Locale;
}

export default function LandingPage({ locale }: LandingPageProps) {
  const t = getTranslations(locale);

  return (
    <>
      <BentoHeroSection t={t} locale={locale} />
      <SectionTwo />
    </>
  );
}
