import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n/locales";
import { getTranslations } from "@/i18n/getTranslations";
import { loadMessages } from "@/i18n/loadMessages";
import { TranslationProvider } from "@/i18n/TranslationContext";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return {
    title: "KeepTrain",
    description: t("hero.description"),
    keywords: "portfolio junior developer",
    authors: { name: "Gilang" },
    creator: "Gilang",
    alternates: {
      languages: {
        en: "/en",
        id: "/id",
      },
    },
    openGraph: {
      title: "Portfolio | Gilang",
      description: t("hero.description"),
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Gilang",
      description: t("hero.description"),
      images: ["/images/og-cover.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = loadMessages(locale as Locale);

  return (
    <TranslationProvider messages={messages} locale={locale}>
      <div id="top" className="mb-15" />
      {children}
      <Footer />
      <BottomNav locale={locale as Locale} />
    </TranslationProvider>
  );
}
