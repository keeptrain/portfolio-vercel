import { Locale } from "@/i18n/locales";
import LandingPage from "@/features/landing/LandingPage";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LandingPage locale={locale as Locale} />;
}
