import { Locale } from "@/i18n/locales";
import { getTranslations } from "@/i18n/getTranslations";
import BentoHeroSection from "./components/bento/BentoHeroSection";
import About from "./components/About";
import IBuildStuff from "./components/IBuildStuff";

interface LandingPageProps {
  locale: Locale;
}

export default function LandingPage({ locale }: LandingPageProps) {
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen space-y-12 sm:space-y-16">
      <BentoHeroSection t={t} locale={locale} />
      <About t={t} />
    </div>
  );
}
