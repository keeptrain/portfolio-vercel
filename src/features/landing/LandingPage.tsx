import SectionShowcase from "./components/SectionShowcase";
import { setRequestLocale } from "@/i18n/server";
import { Locale } from "@/i18n/locales";
import SectionHero from "./components/SectionHero";
import SectionSocial from "./components/SectionSocial";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <SectionHero />
      <SectionShowcase />
      <SectionSocial />
    </>
  );
}
