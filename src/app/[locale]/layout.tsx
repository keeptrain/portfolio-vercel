import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, Locale, defaultLocale } from "@/i18n/locales";
import { getTranslations } from "@/i18n/getTranslations";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LocaleHtmlLang from "@/components/LocaleHtmlLang";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

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
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Gilang",
      description: t("hero.description"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <NavBar locale={locale} />
      {children}
      <Footer />
    </>
  );
}