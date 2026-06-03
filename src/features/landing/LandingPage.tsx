import { Locale } from "@/i18n/locales";
import { getTranslations } from "@/i18n/getTranslations";
import About from "./components/About";
import Hero from "./components/Hero";
import IBuildStuff from "./components/IBuildStuff";
import { FadeInView } from "@/components/animation/FadeInView";

interface LandingPageProps {
  locale: Locale;
}

export default function LandingPage({ locale }: LandingPageProps) {
  const t = getTranslations(locale);

  return (
    <>
      <Hero t={t} locale={locale} />
      <FadeInView>
        <About t={t} />
      </FadeInView>
      <FadeInView delay={100}>
        <IBuildStuff locale={locale} />
      </FadeInView>
    </>
  );
}
