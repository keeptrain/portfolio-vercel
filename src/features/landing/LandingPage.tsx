import { Locale } from "@/i18n/locales";
import { getTranslations } from "@/i18n/getTranslations";
import About from "./components/About";
import Hero from "./components/Hero";
import IBuildStuff from "./components/IBuildStuff";

interface LandingPageProps {
  locale: Locale;
}

export default function LandingPage({ locale }: LandingPageProps) {
  const t = getTranslations(locale);

  return (
    <>
      <Hero t={t} locale={locale} />
      <About t={t} />
      <IBuildStuff locale={locale} />
    </>
  );
}
