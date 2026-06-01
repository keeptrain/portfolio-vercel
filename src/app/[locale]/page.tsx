import { Locale } from "@/i18n/locales";
import LandingPage from "@/features/landing/LandingPage";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <LandingPage locale={locale} />;
}